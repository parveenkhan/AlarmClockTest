import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { OnboardingFrame } from '../../Component/OnboardingFrame';
import { Colors } from '../../Assets/Colors';
import { ONBOARDING_SOUNDS, SoundItem } from '../../Assets/Sounds';
import { useAppDispatch, useAppSelector } from '../../Redux/hooks';
import { setOnboardingSound } from '../../Redux/Actions/Onboarding.Action';
import { NavigationController } from '../../Navigation/NavigationService';
import { tap } from '../../Utils/haptics';

export default function OnboardingSoundScreen() {
  const selected = useAppSelector((s) => s.onboarding.soundId);
  const dispatch = useAppDispatch();

  const pick = (category: string, sound: SoundItem) => {
    dispatch(setOnboardingSound({ category, id: sound.id, name: sound.name }));
  };

  return (
    <OnboardingFrame step={23} onContinue={() => NavigationController.navigate('MissionAudio')}>
      <Text style={styles.title}>Pick your alarm sound</Text>
      <ScrollView contentContainerStyle={{ paddingBottom: 12 }} showsVerticalScrollIndicator={false}>
        <Group
          emoji="🔔"
          title="CLASSIC"
          items={ONBOARDING_SOUNDS.classic}
          selected={selected}
          onPick={(sound) => pick('classic', sound)}
        />
        <Group
          emoji="🔥"
          title="VIRAL"
          items={ONBOARDING_SOUNDS.viral}
          selected={selected}
          onPick={(sound) => pick('viral', sound)}
        />
      </ScrollView>
    </OnboardingFrame>
  );
}

function Group({
  emoji,
  title,
  items,
  selected,
  onPick,
}: {
  emoji: string;
  title: string;
  items: SoundItem[];
  selected: string;
  onPick: (sound: SoundItem) => void;
}) {
  return (
    <View style={{ marginTop: 18 }}>
      <Text style={styles.kicker}>
        {emoji} {title}
      </Text>
      <View style={styles.card}>
        {items.map((item, index) => {
          const on = selected === item.id;
          return (
            <Pressable key={item.id} onPress={() => onPick(item)} style={[styles.row, index > 0 && styles.divider]}>
              <View style={[styles.dot, { backgroundColor: item.color ?? Colors.chip }]}>
                {item.name === 'Default' ? <Ionicons name="notifications" size={16} color={Colors.white} /> : null}
              </View>
              <Text style={styles.name}>{item.name}</Text>
              <Pressable
                onPress={() => {
                  tap();
                  onPick(item);
                }}
                hitSlop={8}
                style={styles.play}>
                <Ionicons name="play" size={14} color="#C0C0C4" />
              </Pressable>
              {on ? (
                <View style={styles.check}>
                  <Ionicons name="checkmark" size={13} color={Colors.white} />
                </View>
              ) : (
                <View style={styles.radio} />
              )}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    fontWeight: '800',
    letterSpacing: -0.6,
  },
  kicker: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.textSecondary,
    letterSpacing: 0.8,
    marginBottom: 10,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: 24,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 12,
    gap: 12,
  },
  divider: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#EFEFF2',
  },
  dot: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
  play: {
    width: 28,
    alignItems: 'center',
  },
  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1.5,
    borderColor: '#D0D0D4',
  },
  check: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: Colors.black,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
