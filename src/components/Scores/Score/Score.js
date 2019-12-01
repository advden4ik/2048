import styled from 'styled-components'
import React from 'react'

const Score = ({title, score}) => {
    return (
        <ScoreTag>
            <div>{title}</div>
            <div>{score}</div>
        </ScoreTag>
    )
}

const ScoreTag = styled.div`
  margin-left: 10px;
  padding: 5px 20px;
  font-size: 16px;
  font-weight: 500;
  background-color: #eee;
  border-radius: 5px;
  text-align: center;
`

export default Score
