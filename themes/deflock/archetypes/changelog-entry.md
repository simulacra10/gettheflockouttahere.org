---
title: "{{ replace .File.ContentBaseName "-" " " | title }}"
date: {{ .Date }}
draft: true
type: correction   # correction | update | addition
summary: >
  What changed and why, in one or two sentences. Never "updated costs page."
affected_page: "/costs/"
source_url: ""
---
