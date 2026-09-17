#!/usr/bin/env bash
#
# block-red-commit.sh
#
# Claude Code PreToolUse hook: stops "git commit" from running when this
# repo's test suite is red. Adapted for the Workshop 3 sample repo (Jest).
# For a real Angular repo, change TEST_CMD to the Angular command noted
# below.
#
# Exit 0 -> allow. Exit 2 -> block, stderr is shown to Claude as the reason.
# Any other non-zero -> non-blocking (never used here on purpose).

set -euo pipefail

INPUT_JSON="$(cat)"

# Parsed with node instead of jq: jq isn't guaranteed to be present (e.g.
# Git Bash on Windows), while node already is (it's needed for npm/jest).
TOOL_NAME="$(echo "$INPUT_JSON" | node -e '
  let s = "";
  process.stdin.on("data", d => s += d);
  process.stdin.on("end", () => {
    try { process.stdout.write(JSON.parse(s).tool_name || ""); } catch { process.stdout.write(""); }
  });
')"
COMMAND="$(echo "$INPUT_JSON" | node -e '
  let s = "";
  process.stdin.on("data", d => s += d);
  process.stdin.on("end", () => {
    try { process.stdout.write((JSON.parse(s).tool_input || {}).command || ""); } catch { process.stdout.write(""); }
  });
')"

if [[ "$TOOL_NAME" != "Bash" ]]; then
  exit 0
fi

if ! echo "$COMMAND" | grep -Eq '(^|[;&|]\s*)git\s+commit(\s|$)'; then
  exit 0
fi

if echo "$COMMAND" | grep -q -- '--no-verify-tests'; then
  echo "block-red-commit: --no-verify-tests present, skipping test gate." >&2
  exit 0
fi

PROJECT_DIR="${CLAUDE_PROJECT_DIR:-$(pwd)}"
cd "$PROJECT_DIR"

# Sample repo (Jest):
TEST_CMD="npm test"
# Real Angular repo: swap to
# TEST_CMD="npm test -- --watch=false --browsers=ChromeHeadless"

TEST_LOG="$(mktemp)"

if ! eval "$TEST_CMD" > "$TEST_LOG" 2>&1; then
  TAIL="$(tail -n 40 "$TEST_LOG")"
  rm -f "$TEST_LOG"
  {
    echo "Commit blocked: the test suite is red."
    echo ""
    echo "Ran: $TEST_CMD"
    echo ""
    echo "Last 40 lines of output:"
    echo "$TAIL"
    echo ""
    echo "Fix the failing test(s), or re-run once they're green, before committing."
  } >&2
  exit 2
fi

rm -f "$TEST_LOG"
exit 0
