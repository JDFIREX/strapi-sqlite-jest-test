#!/bin/bash
npm install $(npm outdated | tr -s ' ' | cut -d' ' -f 1,3 | sed '1d' | tr ' ' '@' | xargs)
