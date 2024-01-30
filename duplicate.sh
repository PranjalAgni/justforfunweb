#!/bin/bash

# Set the source and destination file paths
source_file="build/index.html"
destination_file="build/200.html"

# Check if the source file exists
if [ -e "$source_file" ]; then
  # Duplicate the index.html file as 200.html
  cp "$source_file" "$destination_file"

  echo "Successfully duplicated index.html as 200.html."
else
  echo "Error: index.html does not exist in the build folder."
fi