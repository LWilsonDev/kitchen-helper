# Kitchen helper

## Single page app built using React Native.

#### Demo

A demo of this app can be found [here](https://expo.dev/@lwilsondev/kitchen-helper) - you will need to download the Expo Go app on your device to try it out.

#### Overview

This is a very small app for converting grams to ounces, and other common cooking units.

Users can select an amount to convert and which units they want to go to/from. Once they have selected the units and entered an amount, the app calculated the conversion and plays a simple animation.

#### SVG Animation

I took the opportunity to try out animating a simple svg using AirBNB's [Lottie](https://lottiefiles.com/what-is-lottie) for React Native. I found a suitable SVG on [Pixabay](https://pixabay.com/vectors/libra-kitchen-scale-1714232/) and edited the layers using [Figma](https://www.figma.com/) to facilitate animating the image. I then used [Haiku Animator](https://www.haikuanimator.com/) to create the Lottie JSON animation.

#### Technologies used

- React Native
- Expo
- Typescript
- Lottie Animation
- Figma
- Haiku Animator

#### Bugs and interesting issues

##### Numeric Keypad:

I wanted to use the numeric keypad as the keyboard type, so that the user can more easily enter an amount. However, the number keypad is not dismissible by default.

Trying to dismiss the keyboard using `Keyboard.dismiss()` on Android at the same time as playing the Lottie animation caused some minor performance issues. The better solution was to use a ScrollView with `keyboardShouldPersistTaps='handled'` and `contentContainerStyle={{flexGrow: 1}}`
which means tapping outside of the keyboard will dismiss it. Also adding `returnKeyType={"done"}` to the input meant that the input can be submitted using the 'done' button on the keypad.

##### State management:

There were some interesting challenges created by wanting to be able to submit the form several ways: When the 2 units are selected and a user enters an amount and submits via the keypad; when the user enters an amount first then chooses the units; when the user changes the 'To' unit.

It was important to consider when the result should be cleared from state in order to prevent the wrong conversion from appearing.

##### Error handling:

If the user was using an external keyboard it would be possible to enter a string instead of a number to convert, which resulted in 'NaN' as the result. I added very basic error handling to check for this and display a message.

#### Resources

Scales SVG is adapted from [this icon](https://pixabay.com/vectors/libra-kitchen-scale-1714232/) by janjf93. It is free for commercial use, no attribution required.
