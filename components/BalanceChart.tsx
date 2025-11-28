import { useThemeColors } from "@/app/contexts/ThemeColors";
import { Dimensions, View } from "react-native";
import { LineChart } from "react-native-chart-kit";

export const BalanceChart = () => {
    const { width } = Dimensions.get('window');
    const colors = useThemeColors();
  
  
    const weightData = [
      10, 10.1, 10.1, 10.1, 10.1, 10.1, 10.1, 10.3, 10.3, 10.6,
      10.6, 10.9, 11.0, 11.1, 11.1, 11.0, 11.1, 11.1, 11.2, 11.2,
    ];
  
  
    const currentWeight = weightData[weightData.length - 1];
    const startingWeight = weightData[0];
    const weightLost = startingWeight - currentWeight;
  
    const chartData = {
      labels: ['1', '', '', '', '', '5', '', '', '', '', '10', '', '', '', '', '15', '', '', '', '', '20', '', '', '', '', '25', '', '', '', '', '30'],
      datasets: [
        {
          data: weightData,
          color: () => colors.highlight,
          strokeWidth: 3,
        }
      ]
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
        fill: "transparent",
        stroke: "transparent",
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
      formatYLabel: (yValue: string) => `${yValue}k`,
      withHorizontalLabels: true,
      withVerticalLabels: true,
    };
  
    return (
  
  
      <View className="">
        <View className="pl-2"
        >
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