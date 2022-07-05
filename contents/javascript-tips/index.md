---
date: '2022-07-02'
title: 'Javascript Tips'
categories: ['Javascript']
summary: '자바스크립트 자주 쓰는 유용한 코드들 모음'
thumbnail: ./thumbnail-image.png
publicURL: https://kyong-dev.github.io
---

# 'Javascript Tips'

- Money display formatting

```javascript
money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
```