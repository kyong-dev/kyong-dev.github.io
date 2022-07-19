---
date: '2000-01-01'
title: 'Javascript Tips'
categories: ['Javascript']
summary: '자바스크립트 자주 쓰는 유용한 코드들 모음'
thumbnail: ./javascript-thumbnail.jpeg
publicURL: https://kyong-dev.github.io
---

# 'Javascript Tips'

- Money display formatting

```javascript
const money = 10000;
const moneyDisplay = money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
console.log(`${moneyDisplay}원`);
> 10,000원
```