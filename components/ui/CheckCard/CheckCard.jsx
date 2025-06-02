export default function SgCheckCard ({ type, title, icon, children, backgroundColor }) {
    return (
        <View style={[styles.card, { backgroundColor }]}>
      <View style={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <Icon width={20} height={20} />
      </View>
        <Text style={[styles.time, { color: isCheckIn ? COLORS.brand_600 : COLORS.error_600 }]}
        >
            {time ? time : '--:--:--'}
        </Text>
      </View>

      {children && <View style={styles.children}>{children}</View>}
    </View>
    );
}