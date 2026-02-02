import React from "react";
import {Text, View} from "react-native";
import styles from "./Card.styles";
import COLORS from "@/constants/colors";

export default function SgCard({
                                   title,
                                   contentTitle,
                                   contentDescription,
                                   icon,
                                   time,
                                   children = null,
                                   bgColor,
                                   padding = true,
                               }) {
    const Icon = icon ? icon : null;

    const getBackgroundColor = (type) => {
        switch (type) {
            case "gray":
                return COLORS.gray_50;
            case "green":
                return COLORS.success_50;
            case "yellow":
                return COLORS.warning_50;
            case "danger":
                return COLORS.error_50;
            default:
                return COLORS.white;
        }
    };

    const resolvedBgColor = getBackgroundColor(bgColor);

    let displayTime;
    if (time === undefined) {
        displayTime = null;
    } else if (time === "") {
        displayTime = "--:--:--";
    } else {
        displayTime = time;
    }

    const showHeader = title || icon;
    const hasContent = contentTitle || contentDescription;

    const dynamicStyle = {
        backgroundColor: resolvedBgColor,
    };

    return (
        <View style={[styles.card, dynamicStyle]}>
            <View style={[
                styles.content,
                !padding && {
                    paddingHorizontal: 12,
                }
            ]}>
                {showHeader && (
                    <View style={styles.header}>
                        {title && <Text style={styles.title}>{title}</Text>}
                        {icon && <Icon width={20} height={20}/>}
                    </View>
                )}

                {displayTime !== null && (
                    <Text style={styles.time}>{displayTime}</Text>
                )}

                {hasContent && (
                    <View>
                        {contentTitle && (
                            <Text style={styles.contentTitle}>{contentTitle}</Text>
                        )}
                        {contentDescription ? (
                            <Text style={styles.contentDesc}>{contentDescription}</Text>
                        ) : (
                            <Text style={[styles.contentDesc, {color: COLORS.gray_400}]}>—</Text>
                        )}
                    </View>
                )}

                {children && <View style={styles.children}>{children}</View>}
            </View>
        </View>
    );
}
