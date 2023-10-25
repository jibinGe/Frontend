import React from "react";

function EmbryoScoreBar(props) {
  const CircularProgress = React.memo(({ progress }) => {

    return <Pie percentage={progress} />;
  });

  const Circle = ({ color, percentage }) => {
    const r = 60;
    const circ = 2 * Math.PI * r;
    const strokePct = ((100 - percentage) * circ) / 100; // where stroke will start, e.g. from 15% to 100%.
    const dashOffset = 565.48 - (percentage / 100) * 565.48;
    const rotate = `rotate(${-percentage * 3.6 + 180} 100 100)`
    return (
      <circle
        r={r}
        cx={135}
        cy={65}
        fill="transparent"
        stroke={strokePct !== circ ? color : ""} // remove colour as 0% sets full circumference
        strokeWidth={"8px"}
        strokeDasharray={circ}
        strokeDashoffset={percentage ? strokePct : 0}
        style={{ strokeDashoffset: dashOffset, transform: rotate, transition: 'stroke-dashoffset 2s ease-in-out' }}
      ></circle>
    );
  };

  const Text = ({ text, score }) => {
    return (
      <text
        x="30%"
        y="45%"
        dominantBaseline="central"
        textAnchor="middle"
        fontSize={"20px"}
        fill={score.color}
        fontWeight={900}
      >
        {text}
      </text>
    );
  };
  const TextPercent = () => {
    return (
      <text
        x="58%"
        y="45%"
        dominantBaseline="central"
        textAnchor="middle"
        fontSize={" 20px"}
        fill="#6C7C93"
        fontWeight={900}
      >
        /100
      </text>
    );
  };
  const TextLabel = (props) => {
    return (
      <text
        x="50%"
        y="62%"
        dominantBaseline="central"
        textAnchor="middle"
        fontSize={"16px"}
        fill={props.score.color}
        fontWeight={600}
      >
        {props.score.label}
      </text>
    );
  };

  const Pie = (props) => {
    const score =
      props.percentage >= 75
        ? { label: "Good", color: "#47D273" }
        : props.percentage >= 50
        ? { label: "Fair", color: "#FAC20A" }
        : { label: "Poor", color: "#FB3B42" };

    return (
      <svg width={130} height={130}>
        <g transform={`rotate(-90 ${"100 100"})`}>
          <Circle color="#E2E5E9" />
          <Circle color={score.color} percentage={props.percentage} />
        </g>
        <Text text={props.percentage} score={score} />
        <TextPercent />
        <TextLabel score={score} />
      </svg>
    );
  };
  return (
    <>
      <CircularProgress progress={props.score} />
    </>
  );
}
export default EmbryoScoreBar;
