import React from 'react';

const Total = ({exercises}) =>{
    const total = exercises.reduce((acc, cur) => acc + cur)
    return(
        <div>
            Total exercises in this course: {total}
        </div>
    );
};

export default Total;