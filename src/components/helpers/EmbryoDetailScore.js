import React from 'react'
import EmbryoDetails from "../helpers/embryoDetails";
export const EmbryoDetailScore = ({cards,setIsEdit,setIsEdited}) => {
  return (
    <>
        {cards &&
            cards.map((d, index) => {
              let score = parseFloat(d.percentage).toFixed(2);
              let scoreColor =
                score >= 75
                  ? "8px solid #47D273"
                  : score >= 50
                  ? "8px solid #FAC20A"
                  : "8px solid #FB3B42";
              return (
                <EmbryoDetails
                  key={index}
                  setIsEdit={setIsEdit}
                  setIsEdited={setIsEdited}
                  border={scoreColor}
                  boxShadow={scoreColor}
                  score={score}
                  url={d.img}
                  filename={d.filename}
                />
              );
            })}
    </>
  )
}

export const Search = ({searchResults,setIsEdit,setIsEdited}) => {
    return (
      <>
          {searchResults &&
              searchResults.map((d, index) => {
                let score = parseFloat(d.percentage).toFixed(2);
                let scoreColor =
                  score >= 75
                    ? "8px solid #47D273"
                    : score >= 50
                    ? "8px solid #FAC20A"
                    : "8px solid #FB3B42";
                return (
                  <EmbryoDetails
                    key={index}
                    setIsEdit={setIsEdit}
                    setIsEdited={setIsEdited}
                    border={scoreColor}
                    boxShadow={scoreColor}
                    score={score}
                    url={d.img}
                    filename={d.filename}
                  />
                );
              })}
      </>
    )
  }

