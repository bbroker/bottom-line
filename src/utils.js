
export const getObjectPropSafely = (fn, defaultValue = '') => {
    try {
        return fn();
    } catch (e) {
        return defaultValue;
    }
};

export const getPosition = (args) => {
    const {
        component, 
        viewBox, 
        legendPlacement = 'bottom',
        hasRightYAxis = false,
        borderWeight = {name: 'none', label: 'None', value: 0},
        isStatic = true
    } = args;
    const borderWeightValue = getObjectPropSafely(() => borderWeight.value) || 0;
    const originHeightComponent =  getObjectPropSafely(() => component.height);
    const leftComponent =  getObjectPropSafely(() => component.left);
    const topComponent =  getObjectPropSafely(() => component.top);
    const originWidthComponent =  getObjectPropSafely(() => component.width);
    const heightComponent =  getObjectPropSafely(() => component.height - +borderWeightValue * 2);
    const widthComponent =  getObjectPropSafely(() => component.width - +borderWeightValue * 2);

    const topViewBox =  getObjectPropSafely(() => viewBox.top);
    const leftViewBox =  getObjectPropSafely(() => viewBox.left);
    const heightViewBox =  getObjectPropSafely(() => viewBox.height);
    const widthViewBox = getObjectPropSafely(() => viewBox.width);

    switch (legendPlacement) {
        case 'none' : {
            const axisYLeft = getObjectPropSafely(() => leftViewBox);
            const axisYRight = getObjectPropSafely(() => widthComponent - (leftViewBox + widthViewBox));
            const spaceEst = getObjectPropSafely(() => heightComponent - (topViewBox + heightViewBox));
            const axisX = getObjectPropSafely(() => spaceEst);
        
            return {
                component: {
                    left: leftComponent,
                    top: topComponent,
                    width: originWidthComponent,
                    height: originHeightComponent 
                },
                viewBox: {
                    left: leftViewBox,
                    top: topViewBox,
                    width: widthViewBox,
                    height: heightViewBox 
                },
                chart: {
                    left: 0,
                    top: topViewBox,
                    width: widthComponent,
                    height: heightViewBox + axisX
                },
                axis: {
                    x: axisX,
                    yLeft: axisYLeft,
                    yRight: axisYRight
                },
                legend: {
                    left: 0,
                    top: 0,
                    height: 0,
                    width: 0
                },
                isStatic: isStatic
            };
        }
        case 'bottom' : {
            const axisYLeft = getObjectPropSafely(() => leftViewBox);
            const axisYRight = getObjectPropSafely(() => widthComponent - (leftViewBox + widthViewBox));

            const spaceEst = getObjectPropSafely(() => heightComponent - (topViewBox + heightViewBox));
            const axisX = getObjectPropSafely(() => spaceEst * 1 / 3);

            const topLegend = getObjectPropSafely(() => topViewBox + heightViewBox + axisX);
            const leftLegend = getObjectPropSafely(() => leftViewBox);
            const widthLegend = getObjectPropSafely(() => widthViewBox);
            const heightLegend = getObjectPropSafely(() => spaceEst - axisX);

            return {
                component: {
                    left: leftComponent,
                    top: topComponent,
                    width: originWidthComponent,
                    height: originHeightComponent 
                },
                viewBox: {
                    left: leftViewBox,
                    top: topViewBox,
                    width: widthViewBox,
                    height: heightViewBox 
                },
                chart: {
                    left: 0,
                    top: topViewBox,
                    width: widthComponent,
                    height: heightViewBox + axisX
                },
                axis: {
                    x: axisX,
                    yLeft: axisYLeft,
                    yRight: axisYRight
                },
                legend: {
                    left: leftLegend,
                    top: topLegend,
                    height: heightLegend,
                    width: widthLegend
                },
                isStatic: isStatic
            };
        }
        case 'top' : {
            const axisYLeft = getObjectPropSafely(() => leftViewBox);
            const axisYRight = getObjectPropSafely(() => widthComponent - (leftViewBox + widthViewBox));

            const spaceEst = getObjectPropSafely(() => heightComponent - (topViewBox + heightViewBox));
            const axisX = getObjectPropSafely(() => spaceEst); 

            const topLegend = 0;
            const leftLegend = getObjectPropSafely(() => leftViewBox);
            const widthLegend = getObjectPropSafely(() => widthViewBox);
            const heightLegend = getObjectPropSafely(() => topViewBox);

            return {
                component: {
                    left: leftComponent,
                    top: topComponent,
                    width: originWidthComponent,
                    height: originHeightComponent 
                },
                viewBox: {
                    left: leftViewBox,
                    top: topViewBox,
                    width: widthViewBox,
                    height: heightViewBox
                },
                chart: {
                    left: 0,
                    top: topViewBox,
                    width: widthComponent,
                    height: heightViewBox + axisX
                },
                axis: {
                    x: axisX,
                    yLeft: axisYLeft,
                    yRight: axisYRight
                },
                legend: {
                    left: leftLegend,
                    top: topLegend,
                    height: heightLegend,
                    width: widthLegend
                },
                isStatic: isStatic
            };
        }
        case 'right' : {
            const axisYLeft = getObjectPropSafely(() => leftViewBox);
            const spaceEstHorizontal = getObjectPropSafely(() => widthComponent - (leftViewBox + widthViewBox));

            const spaceEst = getObjectPropSafely(() => heightComponent - (topViewBox + heightViewBox));
            const axisX = getObjectPropSafely(() => spaceEst);

            const axisYRight = hasRightYAxis && getObjectPropSafely(() => spaceEstHorizontal * 1 / 3) || 10;
            
            const topLegend = getObjectPropSafely(() => topViewBox);
            const widthLegend = getObjectPropSafely(() => spaceEstHorizontal - axisYRight);
            const leftLegend = getObjectPropSafely(() => widthComponent - widthLegend);
            const heightLegend = getObjectPropSafely(() => heightViewBox);

            return {
                component: {
                    left: leftComponent,
                    top: topComponent,
                    width: originWidthComponent,
                    height: originHeightComponent 
                },
                viewBox: {
                    left: leftViewBox,
                    top: topViewBox,
                    width: widthViewBox,
                    height: heightViewBox 
                },
                chart: {
                    left: 0,
                    top: topViewBox,
                    width: widthComponent - widthLegend,
                    height: heightViewBox + axisX
                },
                axis: {
                    x: axisX,
                    yLeft: axisYLeft,
                    yRight: axisYRight
                },
                legend: {
                    left: leftLegend,
                    top: topLegend,
                    height: heightLegend,
                    width: widthLegend
                },
                isStatic: isStatic
            };
        }
    }
};
