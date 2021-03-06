import React from "react";
import { View, Image } from "react-native";
import StyleSheet from "./AppStyleSheet";
import AppColors from "./AppColors";

/* =============================================================================
<TimelineSegment />
--------------------------------------------------------------------------------
Description:
  Timeline & dot component to be used in table cells
Props:
  ? left:number           -> absolute offset from left of parent view
  ? color:string          -> timeline color
  ? dotColor:string       -> default dot color
  ? dotColorActive:string -> active dot color
  ? dotOffsetTop:number   -> offset from (to align with text)

============================================================================= */

class TimelineSegment extends React.Component {
    static defaultProps = {
        line: true,
        dot: true,
        left: 24,
        lineOffsetTop: 0,
        dotOffsetTop: 0,
        dotSize: 7,
        lineWidth: 1,
        color: AppColors.colorWithAlpha("tangaroa", 0.2), // TODO: Should be 0.4 alpha
        dotColor: AppColors.colorWithAlpha("tangaroa", 0.2),
        active: false,
        dotColorActive: AppColors.pink
    };

    constructor(props) {
        super(props);

        this.styles = StyleSheet.create({
            container: {
                position: "absolute",
                left: props.left - props.dotSize / 2,
                width: props.dotSize,
                top: 0,
                bottom: 0
            },
            timelineLine: {
                position: "absolute",
                left: props.dotSize / 2 - props.lineWidth / 2,
                top: props.lineOffsetTop,
                bottom: 0,
                width: props.lineWidth,
                backgroundColor: props.color
            },
            timelineDot: {
                position: "absolute",
                width: props.dotSize,
                height: props.dotSize,
                borderRadius: props.dotSize / 2,
                top: props.dotOffsetTop,
                left: 0,
                borderWidth: 1,
                backgroundColor: AppColors.bianca,
                borderColor: props.dotColor
            },
            timelineDotActive: {
                backgroundColor: props.dotColorActive
            }
        });
    }

    render() {
        return (
            <View pointerEvents="none" style={this.styles.container}>
                {this.renderLine()}
                {this.renderDot()}
            </View>
        );
    }

    renderLine() {
        if (!this.props.line) {
            return null;
        } else {
            return <View style={this.styles.timelineLine} />;
        }
    }

    renderDot() {
        if (!this.props.dot) {
            return null;
        }
        const {
            active,
            dotIconDefault,
            dotIconActive,
            dotOffsetTop,
            dotSize
        } = this.props;
        if (dotIconDefault && dotIconActive) {
            return (
                <Image
                    source={active ? dotIconActive : dotIconDefault}
                    style={{
                        position: "absolute",
                        width: dotSize,
                        height: dotSize,
                        top: dotOffsetTop,
                        left: 0
                    }}
                />
            );
        } else {
            return (
                <View
                    style={[
                        this.styles.timelineDot,
                        active ? this.styles.timelineDotActive : null
                    ]}
                />
            );
        }
    }
}

/* Export
============================================================================= */
export default TimelineSegment;
