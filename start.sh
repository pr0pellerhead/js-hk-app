#!/bin/bash
node services/proxy/index.js &
node services/auth/index.js &
node services/files/index.js &
node services/notes/index.js &