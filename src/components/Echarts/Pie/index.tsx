import React, { useRef, useMemo } from "react";
import echarts, { getGraphic } from "@/utils/echarts.config";
import type { ChartOptions } from "@/utils/echarts.config";
import { ECHART_COMMON_COLOR } from "constants/common";
import numberFormat from "utils/numberFormat";
import BasicEchart from "../BasicEchart";

interface PieProps {
  data: {
    dataSource: (string | number)[][];
  };
  style?: Record<string, any>;
  onHoverChange?: (params: any) => void;
  onClickChange?: (params: any) => void;
}

// 获取整个图表的基础配置
const getBaseOptions = () => {
  const baseOptions: ChartOptions = {
    color: ECHART_COMMON_COLOR,
    // @ts-ignore
    graphic: getGraphic(),
    legend: {
      type: "scroll",
      height: "88%",
      right: 12,
      top: "middle",
      icon: "rect",
      align: "left",
      orient: "vertical",
      itemWidth: 20,
      itemHeight: 8,
      itemGap: 12,
      textStyle: {
        width: 120,
        overflow: "truncate",
        color: "#808191",
        fontSize: 14,
        fontFamily: "SourceHanSansCN-Medium",
        fontWeight: 500,
      },
      selectedMode: true,
      pageTextStyle: {
        color: "#808191",
      },
    },
    tooltip: {
      show: true,
      valueFormatter: (value: any) => numberFormat(value, true) as string,
    },
    series: [
      {
        name: "Price",
        type: "pie",
        radius: ["55%", "72%"],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: "center",
          fontSize: 26,
          formatter: (params: any) => {
            if (params && params.value) {
              return `{value|${numberFormat(params.value[1], true)}}\n\n${
                params.name
              }`;
            }
            return "";
          },
          rich: {
            value: {
              color: "#fff",
              fontFamily: "SourceHanSansCN-Bold",
              fontWeight: "bold",
              fontSize: 28,
            },
          },
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 20,
            color: "#ccc",
            fontWeight: "normal",
          },
        },
        labelLine: {
          show: false,
        },
      },
    ],
    dataset: {
      source: [],
    },
  };
  return baseOptions;
};

const Pie = ({
  data, // 数据
  style, // 样式
  onHoverChange, // 鼠标hover事件
  onClickChange, // 点击事件
}: PieProps) => {
  // 图表最终的配置数据
  const chartOptions = useMemo(() => {
    const options = getBaseOptions();
    const { dataSource } = data;
    if (!dataSource) return options;
    options.dataset = { source: dataSource };
    return options;
  }, [data]);

  return (
    <BasicEchart
      options={chartOptions}
      style={style}
      onClickChange={onClickChange}
      onHoverChange={onHoverChange}
    />
  );
};

export default Pie;
