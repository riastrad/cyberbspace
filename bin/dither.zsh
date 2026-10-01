#!/usr/bin/env zsh
setopt null_glob

modified=$(git diff --name-only --cached | grep -e ".png" -e ".jpeg" -e ".jpg")
if [[ -z $modified ]] && [[ -z $FORCE_DITHER ]]; then
    echo "[didder] found no images to dither."
else
    for f in img/**/*.jpeg(N); do
        if [[ -f ${f%.jpeg}-dithered.png ]] && [[ -z $FORCE_DITHER ]]; then
            continue;
        fi
        didder -i $f -o ${f%.jpeg}-dithered.png -s 80% --palette "000000 222222 444444 666666 888888 aaaaaa cccccc ffffff" edm Atkinson
        # git-add is here for the hook & shouldn't be invoked for the forced rewrite
        if [[ -z $FORCE_DITHER ]]; then
            git add -- ${f%.jpeg}-dithered.png
        fi
        echo "[didder] created dithered copy of \"$f\""
    done
fi

echo "[didder] script exited cleanly."
exit 0
