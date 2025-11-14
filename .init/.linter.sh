#!/bin/bash
cd /tmp/kavia/workspace/code-generation/real-time-word-counter-129-138/word_counter_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

