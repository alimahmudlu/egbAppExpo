import { Text, View, Pressable } from "react-native";
import styles from "@/components/sections/InfoCard/InfoCard.styles";
import RightIcon from '@/assets/images/chevron-right.svg';
import CheckIn from "@/assets/images/check-in.svg";
import CheckOut from "@/assets/images/check-out.svg";
import COLORS from "@/constants/colors";
import { useRouter } from 'expo-router';

export default function SgSectionInfoCard({ customIcon, title, count, type, href = null, children = null }) {
  const router = useRouter();

  let bgColor;
  let textColor;
  let IconComponent;

  switch (type) {
    case 'checkin':
      bgColor = styles.checkinBg;
      textColor = styles.checkinText;
      IconComponent = CheckIn;
      break;
    case 'checkout':
      bgColor = styles.checkoutBg;
      textColor = styles.checkoutText;
      IconComponent = CheckOut;
      break;
    default:
      bgColor = styles.grayBg;
      textColor = styles.defaultText || { color: COLORS.black };
      IconComponent = customIcon || null;
      break;
  }

  function handleOnClick() {
    if (href) {
      router.navigate(href)
    }
  }

  return (
      <Pressable onPress={handleOnClick} style={[styles.infoCard, bgColor]}>
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            {IconComponent && (
                <IconComponent width={20} height={20} style={{ color: textColor.color }} />
            )}
            {!!href ?
                <View style={styles.iconWrapper}>
                  <RightIcon width={20} height={20} />
              </View>
              : null
            }

          </View>
        </View>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={[styles.cardCount, textColor]}>{count}</Text>

        <View>
          {children}
        </View>
      </Pressable>
  );
}
