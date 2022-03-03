import React from 'react';
import Badminton from '../../../../assets/icons/shuttlecock.svg';
import Futsal from '../../../../assets/icons/futsal.svg';
import Football from '../../../../assets/soccer-ball.svg';

const Svg = (sports) => {
    if (sports === 'Badminton')
        return <Badminton width={20} height={20} />
    else if (sports === 'Futsal')
        return <Futsal width={20} height={20} />
    else if (sports === 'Football')
        return <Football width={20} height={20} />
}

export default Svg;