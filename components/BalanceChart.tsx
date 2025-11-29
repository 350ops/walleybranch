import { useMemo } from 'react';
import { Dimensions, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import useThemeColors from '@/contexts/ThemeColors';

type BalanceChartProps = {
  data?: number[];
  labels?: string[];
};

const defaultData = [
  10, 10.1, 10.1, 10.1, 10.1, 10.1, 10.1, 10.3, 10.3, 10.6, 10.6, 10.9, 11.0, 11.1, 11.1, 11.0,
  11.1, 11.1, 11.2, 11.2,
];

const defaultLabels = [
  '1',
  '',
  '',
  '',
  '',
  '5',
  '',
  '',
  '',
  '',
  '10',
  '',
  '',
  '',
  '',
  '15',
  '',
  '',
  '',
  '',
  '20',
];

export const BalanceChart = ({ data, labels }: BalanceChartProps) => {
  const { width } = Dimensions.get('window');
  const colors = useThemeColors();

  const resolvedData = data && data.length > 0 ? data : defaultData;
  const resolvedLabels =
    labels && labels.length > 0 ? labels : defaultLabels.slice(0, resolvedData.length);

  const numberFormatter = useMemo(
    () =>
      new Intl.NumberFormat('en', {
        maximumFractionDigits: 1,
      }),
    []
  );

  const chartData = {
    labels: resolvedLabels,
    datasets: [
      {
        data: resolvedData,
        color: () => colors.highlight,
        strokeWidth: 3,
      },
    ],
  };

  const chartConfig = {
    backgroundColor: 'transparent',
    backgroundGradientFrom: 'transparent',
    backgroundGradientTo: 'transparent',
    backgroundGradientFromOpacity: 0,
    backgroundGradientToOpacity: 0,
    decimalPlaces: 1,
    color: () => colors.highlight,
    labelColor: () => colors.text,
    style: {
      borderRadius: 0,
    },
    fillShadowGradient: colors.highlight,
    fillShadowGradientOpacity: 0.25,
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      fill: 'transparent',
      stroke: 'transparent',
    },

    propsForBackgroundLines: {
      strokeWidth: 1,
      stroke: colors.isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
      strokeDasharray: '',
    },
    propsForVerticalLines: {
      strokeWidth: 0,
      stroke: 'transparent',
    },
    propsForHorizontalLines: {
      strokeWidth: 1,
      stroke: colors.isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.4)',
    },
    formatYLabel: (yValue: string) => numberFormatter.format(Number(yValue)),
    withHorizontalLabels: true,
    withVerticalLabels: true,
  };

  return (
    <View className="">
      <View className="pl-2">
        <LineChart
          data={chartData}
          width={width - 0}
          height={250}
          chartConfig={chartConfig}
          withDots={true}
          withShadow={true}
          withInnerLines={true}
          withOuterLines={true}
          withHorizontalLabels={true}
          withVerticalLabels={true}
          withVerticalLines={false}
          //bezier

          style={{
            borderRadius: 0,
            backgroundColor: 'transparent',
            marginLeft: -10,
          }}
        />
      </View>
    </View>
  );
};
