---
date: '2000-01-01'
title: 'React Native Useful Libraries'
categories: ['React Native', 'React Native Library', 'Typescript']
summary: '리액트 네이티브 실사용에 필요한 라이브러리 모음.'
thumbnail: ./react-native-useful-library.png
publicURL: https://kyong-dev.github.io
---
# 'React Native Useful Libraries'

## 1. React Native Keyboard Aware Scrollview

- Install the library
```bash
% npm i react-native-keyboard-aware-scrollview 
```

- src/components/DismissKeyboardView.tsx
```ts
import React from 'react';
import {
    TouchableWithoutFeedback,
    Keyboard,
    StyleProp,
    ViewStyle,
} from 'react-native';

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";

const DismissKeyboardView: React.FC<{ style?: StyleProp<ViewStyle> }> = ({ 
    children, 
    ...props 
}) => (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <KeyboardAwareScrollView {...props} style={props.style}>
            {children}
        </KeyboardAwareScrollView>
    </TouchableWithoutFeedback>
);

export default DismissKeyboardView;
```
<br />
- 타입스크립트 미지원으로 타입을 직접 작성 해야함. <br />
types/react-native-keyboard-aware-scrollview.d.ts

```ts
declare module 'react-native-keyboard-aware-scrollview' {
    import * as React from 'react';
    import { Constructor, ViewProps } from 'react-native';
    class KeyboardAwareScrollViewComponent extends React.Component<ViewProps> { }
    const KeyboardAwareScrollViewBase: KeyboardAwareScrollViewComponent &
        Constructor<any>;
    class KeyboardAwareScrollView extends KeyboardAwareScrollViewComponent { }
    export { KeyboardAwareScrollView };
}
```
<br />

- 코드를 감싸준다.

```ts
import DismissKeyboardView from "../components/DissmissKeyboardView";

...

    return (
        <DismissKeyboardView styles={styles.fromWrapper}>

            ...

        </DismissKeyboardView>
    );
}
```