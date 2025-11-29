import React, { useEffect } from 'react';
import { View, Platform } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  runOnUI,
} from 'react-native-reanimated';
import ThemedText from './ThemedText';

interface BarData {
  month: string;
  value: number;
  isHighlighted?: boolean;
}

interface AnimatedBarChartProps {
  data: BarData[];
  animate?: boolean;
  valueFormatter?: (value: number) => string;
}

export const AnimatedBarChart: React.FC<AnimatedBarChartProps> = ({
  data,
  animate = true,
  valueFormatter,
}) => {
  const maxValue = Math.max(1, ...data.map((item) => item.value));

  return (
    <View className="flex-row items-end justify-between px-4 py-6">
      {data.map((item, index) => (
        <AnimatedBar
          key={item.month}
          data={item}
          maxValue={maxValue}
          delay={index * 100}
          animate={animate}
          valueFormatter={valueFormatter}
        />
      ))}
    </View>
  );
};

interface AnimatedBarProps {
  data: BarData;
  maxValue: number;
  delay: number;
  animate: boolean;
  valueFormatter?: (value: number) => string;
}

const AnimatedBar: React.FC<AnimatedBarProps> = ({
  data,
  maxValue,
  delay,
  animate,
  valueFormatter,
}) => {
  const heightAnim = useSharedValue(0);
  const opacityAnim = useSharedValue(0);

  useEffect(() => {
    if (animate) {
      // Use runOnUI for Android compatibility with New Architecture
      const startAnimation = () => {
        'worklet';
        heightAnim.value = 0;
        opacityAnim.value = 0;
        heightAnim.value = withDelay(delay, withTiming(1, { duration: 800 }));
        opacityAnim.value = withDelay(delay, withTiming(1, { duration: 600 }));
      };

      if (Platform.OS === 'android') {
        // Use runOnUI for better Android compatibility
        runOnUI(startAnimation)();
      } else {
        // Reset values first
        heightAnim.value = 0;
        opacityAnim.value = 0;
        // Animate height and opacity with delay
        heightAnim.value = withDelay(delay, withTiming(1, { duration: 800 }));
        opacityAnim.value = withDelay(delay, withTiming(1, { duration: 600 }));
      }
    } else {
      // Show immediately without animation
      heightAnim.value = 1;
      opacityAnim.value = 1;
    }
  }, [animate, delay]);

  const animatedStyle = useAnimatedStyle(() => {
    const targetHeight = (data.value / maxValue) * 200; // Max height of 200
    return {
      height: heightAnim.value * targetHeight,
      opacity: opacityAnim.value,
    };
  });

  const textAnimatedStyle = useAnimatedStyle(() => ({
    opacity: opacityAnim.value,
  }));

  return (
    <View className="flex-col items-center">
      <Animated.View style={textAnimatedStyle} className="mb-2"></Animated.View>
      <View className="h-[200px] justify-end">
        <Animated.View
          style={animatedStyle}
          className={`relative w-12 rounded-full ${
            data.isHighlighted ? 'bg-highlight' : 'bg-text'
          }`}>
          <ThemedText className="-mt-7 text-center text-sm font-semibold">
            {valueFormatter ? valueFormatter(data.value) : `$${data.value}k`}
          </ThemedText>
        </Animated.View>
      </View>

      <View className="mt-3">
        <ThemedText className="text-sm font-medium">{data.month}</ThemedText>
      </View>
    </View>
  );
};
