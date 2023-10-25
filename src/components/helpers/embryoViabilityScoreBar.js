import React, {useState, useEffect} from "react";

function EmbryoScoreBar(props) {
  const CircularProgress = React.memo(({ progress }) => {
    const [currentProgress, setCurrentProgress] = useState(0);
    useEffect(() => {
      const intervalId = setInterval(() => {
        setCurrentProgress((prevProgress) => {
          if (prevProgress < progress) {
            return prevProgress + 1;
          }
          clearInterval(intervalId);
          return prevProgress;
        });
      }, 20);
  
      return () => {
        clearInterval(intervalId);
      };
    }, []);

    return <Pie percentage={currentProgress} result = {progress} />;
  });

  const Circle = ({ color, percentage,score }) => {
    const r = 60;
    const circ = 2 * Math.PI * r;
    const strokePct = ((100 - (percentage-1)) * circ) / 100; // where stroke will start, e.g. from 15% to 100%.
    //const strokePct=(1 - (score / 100)) * cir
    const dashOffset = 565.48 - (percentage / 100) * 565.48;
    const rotate = `rotate(${-percentage * 3.6 + 180} 100 100)`
    //console.log(strokePct);
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
      ></circle>
    );
  };

  const Text = ({ text, score }) => {
    return (
      <text
        x="38%"
        y="45%"
        dominantBaseline="central"
        textAnchor="middle"
        fontSize={"18px"}
        fill={score.text}
        fontWeight={900}
        lineHeight={"19px"}
      >
        {text}
      </text>
    );
  };
  const TextPercent = () => {
    return (
      <text
        x="65%"
        y="45%"
        dominantBaseline="central"
        textAnchor="middle"
        fontSize={" 10px"}
        fill="#6C7C93"
        fontWeight={900}
        
      >/100
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
        fill={props.score.text}
        fontWeight={600}
      >
        {props.score.label}
      </text>
    );
  };

  const Pie = (props) => {
    const score =
      props.percentage >= 75
        ? { label: "Good", color: "#6DA6F8", text: "#47D273" }
        : props.percentage >= 50
        ? { label: "Fair", color: "#5497F7", text:"#FAC20A" }
        : { label: "Poor", color: "#6DA6F8", text:"#FB3B42" };

    return (
      <svg width={130} height={130}>
        <g transform={`rotate(-90 ${"100 100"})`}>
          <Circle color="#CEE1FD" />
          <Circle color={props.percentage>=75?"#2279F5": props.percentage>=50?"#5497F7":"#6DA6F8"} percentage={props.percentage} score={props.score}/>
        </g>
        <Text text={props.result} score={score} />
        <TextPercent />
        <TextLabel score={score} />
      </svg>
    );
  };
  return (
    <div>
      <CircularProgress progress={props.score} />
    </div>
  );
}
export default EmbryoScoreBar;

