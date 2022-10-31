#!/bin/bash
. ~/.bashrc
echo "refresh_token: '$(aliyunpan-cli token --refresh)'"  >  ~/.config/aliyunpan.yaml
