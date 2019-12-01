import React from 'react'
import Score from './Score/Score'
import styled from 'styled-components'

const Scores = ({score}) => {
    return (
        <ScoresTag>
            <Score title='Score' score={score}/>
            <Score title='Best' score={localStorage.getItem('best')} />
        </ScoresTag>
    )
}

const ScoresTag = styled.div`
  display: flex;
`

export default Scores