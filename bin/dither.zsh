#!/usr/bin/env zsh
setopt null_glob

modified=$(git diff --name-only | grep -e ".png" -e ".jpeg" -e ".jpg")
if [[ -z $modified ]]; then
    echo "[didder] found no images to dither."
else
    for f in img/**/*.jpeg(N); do
        if [[ -f ${f%.jpeg}-dithered.png ]]; then
            continue;
        fi
        didder -i $f -o ${f%.jpeg}-dithered.png -s 80% --palette "000000 222222 444444 666666 888888 aaaaaa cccccc ffffff" edm Atkinson
        echo "[didder] created dithered copy of \"$f\""
    done
fi

echo "[didder] script exited cleanly."
exit 0
