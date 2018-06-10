"use strict";

// Dependencies
// =============================================================================

import React from "react";
import ReactNative from "react-native";
import AppColors from "./AppColors";
import AppFonts from "./AppFonts";
import StyleSheet from "./AppStyleSheet";

// Text Elements
// =============================================================================

export function Text({
  style,
  ...props
}: Object): ReactElement<ReactNative.Text> {
  return <ReactNative.Text style={[styles.text, style]} {...props} />;
}

export function Heading1({
  style,
  ...props
}: Object): ReactElement<ReactNative.Text> {
  return <ReactNative.Text style={[styles.h1, style]} {...props} />;
}

export function Heading2({
  style,
  ...props
}: Object): ReactElement<ReactNative.Text> {
  return <ReactNative.Text style={[styles.h2, style]} {...props} />;
}

export function Heading3({
  style,
  ...props
}: Object): ReactElement<ReactNative.Text> {
  return <ReactNative.Text style={[styles.h3, style]} {...props} />;
}

export function Heading4({
  style,
  ...props
}: Object): ReactElement<ReactNative.Text> {
  return <ReactNative.Text style={[styles.h4, style]} {...props} />;
}

export function Heading5({
  style,
  ...props
}: Object): ReactElement<ReactNative.Text> {
  return <ReactNative.Text style={[styles.h5, style]} {...props} />;
}

export function Paragraph({
  style,
  ...props
}: Object): ReactElement<ReactNative.Text> {
  return <ReactNative.Text style={[styles.p, style]} {...props} />;
}

// export function Hyperlink({style, ...props}: Object): ReactElement<ReactNative.Text> {
//   return <ReactNative.Text style={[styles.a, style]} {...props} />;
// }

export function HeaderTitle({
  style,
  ...props
}: Object): ReactElement<ReactNative.Text> {
  return <ReactNative.Text style={[styles.headerTitle, style]} {...props} />;
}

export function HorizontalRule({
  style,
  ...props
}: Object): ReactElement<ReactNative.Text> {
  return <ReactNative.View style={[styles.hr, style]} {...props} />;
}

// Styles
// =============================================================================

const styles = StyleSheet.create({
  text: {
    fontFamily: AppFonts.default
  },
  h1: {
    fontFamily: AppFonts.h1,
    fontSize: AppFonts.normalize(30),
    lineHeight: AppFonts.lineHeight(37),
    color: AppColors.blue
  },
  h2: {
    fontFamily: AppFonts.h2,
    fontSize: AppFonts.normalize(23),
    lineHeight: AppFonts.lineHeight(27), //, 1.4
    color: AppColors.tangaroa,
    letterSpacing: -0.24
  },
  h3: {
    fontFamily: AppFonts.h3,
    fontSize: AppFonts.normalize(17),
    lineHeight: AppFonts.lineHeight(20),
    color: AppColors.sapphire,
    letterSpacing: -0.11
  },
  h4: {
    fontFamily: AppFonts.h4,
    fontSize: AppFonts.normalize(13),
    lineHeight: AppFonts.lineHeight(22),
    color: AppColors.tangaroa
  },
  h5: {
    fontFamily: AppFonts.helvetica,
    fontSize: AppFonts.normalize(13),
    lineHeight: AppFonts.lineHeight(22),
    color: AppColors.tangaroa
  },
  p: {
    fontFamily: AppFonts.p,
    fontSize: AppFonts.normalize(17),
    lineHeight: AppFonts.lineHeight(25), //, 1.25
    color: AppColors.black
  },
  // a: {
  //   color: AppColors.blue,
  //   textDecorationLine: 'underline',
  // },
  hr: {
    height: 1,
    backgroundColor: AppColors.colorWithAlpha("black", 0.1)
  },
  headerTitle: {
    fontFamily: AppFonts.fontWithWeight("helvetica", "semibold"),
    ios: { fontSize: 17 },
    android: { fontSize: 20 }
  }
});
