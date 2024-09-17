const chartOptions1 = {
    layout: {
        background: { type: 'solid', color: 'white' },
        textColor: 'black',
    },
    grid: {
        vertLines: {
            color: '#e1e1e1',
        },
        horzLines: {
            color: '#e1e1e1',
        },
    },
    crosshair: {
        mode: LightweightCharts.CrosshairMode.Normal,
    },
    timeScale: {
        visible: false,
    },
    width: document.getElementById('chart').clientWidth,
    height: document.getElementById('chart').clientHeight,
};

const chartOptions2 = {
    layout: {
        background: { type: 'solid', color: 'white' },
        textColor: 'black',
    },
    grid: {
        vertLines: {
            color: '#e1e1e1',
        },
        horzLines: {
            color: '#e1e1e1',
        },
    },
    timeScale: {
        visible: true,
    },
    width: document.getElementById('chart').clientWidth,
    height: document.getElementById('rsiChart').clientHeight,
};

const chart = LightweightCharts.createChart(document.getElementById('chart'), chartOptions1);
const candlestickSeries = chart.addCandlestickSeries();
const emaLine = chart.addLineSeries({
    color: 'blue', // Set the color for the EMA line
    lineWidth: 2
});

const rsiChart = LightweightCharts.createChart(document.getElementById('rsiChart'),chartOptions2);
const rsiLine = rsiChart.addLineSeries({
    color: 'red', // Set the color for the RSI line
    lineWidth: 2
});

let autoUpdateInterval;

// Fetch data function
function fetchData(ticker, timeframe, emaPeriod, rsiPeriod) {
    fetch(`/api/data/${ticker}/${timeframe}/${emaPeriod}/${rsiPeriod}`)
        .then(response => response.json())
        .then(data => {
            candlestickSeries.setData(data.candlestick);
            emaLine.setData(data.ema);
            rsiLine.setData(data.rsi);

            
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

// Fetch NVDA data on page load with default timeframe (daily), EMA period (20) and RSI period (14)

const tickerInput = document.getElementById('ticker');
window.addEventListener('load', () => {
    fetchData('WIPRO.NS', '1d', 20, 14);
    tickerInput.value = 'WIPRO.NS';
    loadWatchlist();
});

// Handle data fetching on button click
document.getElementById('fetchData').addEventListener('click', () => {
    const ticker = document.getElementById('ticker').value;
    const timeframe = document.getElementById('timeframe').value;
    const emaPeriod = document.getElementById('emaPeriod').value;
    const rsiPeriod = document.getElementById('rsiPeriod').value;
    fetchData(ticker, timeframe, emaPeriod, rsiPeriod);
});

// Handle auto-update functionality
document.getElementById('autoUpdate').addEventListener('change', (event) => {
    if (event.target.checked) {
        const frequency = document.getElementById('updateFrequency').value * 1000;
        autoUpdateInterval = setInterval(() => {
            const ticker = document.getElementById('ticker').value;
            const timeframe = document.getElementById('timeframe').value;
            const emaPeriod = document.getElementById('emaPeriod').value;
            const rsiPeriod = document.getElementById('rsiPeriod').value;
            fetchData(ticker, timeframe, emaPeriod, rsiPeriod);
        }, frequency);
    } else {
        clearInterval(autoUpdateInterval);
    }
});

// Handle window resize
window.addEventListener('resize', () => {
    chart.resize(document.getElementById('chart').clientWidth, document.getElementById('chart').clientHeight);
    rsiChart.resize(document.getElementById('rsiChart').clientWidth, document.getElementById('rsiChart').clientHeight);
});

// Theme toggle functionality
document.getElementById('themeToggle').addEventListener('click', () => {
    const bodyClassList = document.body.classList;
    const watchlist = document.getElementById('watchlist');
    const inputs = document.querySelectorAll('input, select');
    if (bodyClassList.contains('bg-white')) {
        bodyClassList.replace('bg-white', 'bg-gray-900');
        bodyClassList.replace('text-black', 'text-white');
        watchlist.classList.replace('bg-gray-100', 'bg-gray-800');
        watchlist.classList.replace('text-black', 'text-white');
        inputs.forEach(input => {
            input.classList.replace('bg-white', 'bg-gray-900');
            input.classList.replace('text-black', 'text-white');
        });
        chart.applyOptions({
            layout: {
                background: { type: 'solid', color: 'black' },
                textColor: 'white',
            },
            grid: {
                vertLines: {
                    color: 'black',
                },
                horzLines: {
                    color: 'black',
                },
            }
        });
        rsiChart.applyOptions({
            layout: {
                background: { type: 'solid', color: 'black' },
                textColor: 'white',
            },
            grid: {
                vertLines: {
                    color: 'black',
                },
                horzLines: {
                    color: 'black',
                },
            }
        });
    } else {
        bodyClassList.replace('bg-gray-900', 'bg-white');
        bodyClassList.replace('text-white', 'text-black');
        watchlist.classList.replace('bg-gray-800', 'bg-gray-100');
        watchlist.classList.replace('text-white', 'text-black');
        inputs.forEach(input => {
            input.classList.replace('bg-gray-900', 'bg-white');
            input.classList.replace('text-white', 'text-black');
        });
        chart.applyOptions({
            layout: {
                background: { type: 'solid', color: 'white' },
                textColor: 'black',
            },
            grid: {
                vertLines: {
                    color: '#e1e1e1',
                },
                horzLines: {
                    color: '#e1e1e1',
                },
            }
        });
        rsiChart.applyOptions({
            layout: {
                background: { type: 'solid', color: 'white' },
                textColor: 'black',
            },
            grid: {
                vertLines: {
                    color: '#e1e1e1',
                },
                horzLines: {
                    color: '#e1e1e1',
                },
            }
        });
    }
});

function fetchAndSetBuyPrice(symbol) {
    fetch(`/api/${symbol}`)
        .then(response => response.json())
        .then(data => {
            if (data.market_price) {
                const triggerPriceBuy = document.getElementById('triggerPriceBuy');
                if (triggerPriceBuy) {
                    triggerPriceBuy.value = data.market_price;
                    console.log('Price fetched and set');
                } else {
                    console.error('Element not found');
                }
            } else {
                console.error('Error fetching stock price:', data.error);
            }
        })
        .catch(error => console.error('Error fetching stock price:', error));
}


// Load watchlist symbols from the server
function loadWatchlist() {
    fetch('/api/symbols')
        .then(response => response.json())
        .then(symbols => {
            const watchlistItems = document.getElementById('watchlistItems');
            watchlistItems.innerHTML = '';
            symbols.forEach(symbol => {
                const item = document.createElement('div');
                item.className = 'watchlist-item';
                item.innerText = symbol;
                item.addEventListener('click', () => {
                    document.getElementById('ticker').value = symbol;
                    fetchData(symbol, document.getElementById('timeframe').value, document.getElementById('emaPeriod').value, document.getElementById('rsiPeriod').value);
                    fetchAndSetBuyPrice(symbol)
                });
                watchlistItems.appendChild(item);
            });
        })
        .catch(error => {
            console.error('Error loading watchlist:', error);
        });
}

// Sync visible logical range between charts
function syncVisibleLogicalRange(chart1, chart2) {
    chart1.timeScale().subscribeVisibleLogicalRangeChange(timeRange => {
        chart2.timeScale().setVisibleLogicalRange(timeRange);
    });

    chart2.timeScale().subscribeVisibleLogicalRangeChange(timeRange => {
        chart1.timeScale().setVisibleLogicalRange(timeRange);
    });
}


syncVisibleLogicalRange(chart, rsiChart);

// Sync crosshair position between charts
function getCrosshairDataPoint(series, param) {
    if (!param.time) {
        return null;
    }
    const dataPoint = param.seriesData.get(series);
    return dataPoint || null;
}

function syncCrosshair(chart, series, dataPoint) {
    if (dataPoint) {
        chart.setCrosshairPosition(dataPoint.value, dataPoint.time, series);
        return;
    }
    chart.clearCrosshairPosition();
}

chart.subscribeCrosshairMove(param => {
    const dataPoint = getCrosshairDataPoint(candlestickSeries, param);
    syncCrosshair(rsiChart, rsiLine, dataPoint);
});

rsiChart.subscribeCrosshairMove(param => {
    const dataPoint = getCrosshairDataPoint(rsiLine, param);
    syncCrosshair(chart, candlestickSeries, dataPoint);
});

const suggestionsDiv = document.getElementById('suggestions');

tickerInput.addEventListener('input', () => {
    const query = tickerInput.value.trim();
    if (query.length > 0) {
        fetch(`/api/search?q=${query}`)
            .then(response => response.json())
            .then(stocks => {
                if (stocks.length > 0) {
                    suggestionsDiv.innerHTML = '';
                    stocks.forEach(stock => {
                        const item = document.createElement('div');
                        item.className = 'p-2 hover:bg-gray-200 cursor-pointer';
                        item.textContent = `${stock.company_name} (${stock.symbol})`;
                        item.addEventListener('click', () => {
                            tickerInput.value = `${stock.symbol}.NS`;
                            suggestionsDiv.innerHTML = '';  // Clear suggestions
                            fetchData(tickerInput.value, document.getElementById('timeframe').value, document.getElementById('emaPeriod').value, document.getElementById('rsiPeriod').value);
                            /* console.log('testing') */
                            // Fetch the current price for the selected symbol
                            fetchAndSetBuyPrice(query)
                        });
                        suggestionsDiv.appendChild(item);
                    });
                    suggestionsDiv.classList.remove('hidden');
                } else {
                    suggestionsDiv.classList.add('hidden');
                }
            })
            .catch(error => console.error('Error fetching stock suggestions:', error));
    } else {
        suggestionsDiv.classList.add('hidden');
    }
});

document.getElementById('buyBtn').addEventListener('click', function () {

    const quantity = parseInt(document.getElementById('quantity').value, 10);
    if (isNaN(quantity) || quantity <= 0) {
        document.getElementById('feedback').innerText = 'Please enter a valid quantity';
        return;
    }
    const symbol = document.getElementById('ticker').value;

    fetch(`/api/${symbol}`)
        .then(response => response.json())
        .then(data => {
            if (data.market_price) {
                // Extract user details from the URL
                const urlParams = new URLSearchParams(window.location.search);
                const userDetails = JSON.parse(decodeURIComponent(urlParams.get('user')));

                // Calculate the total cost of the purchase
                const totalCost = data.market_price * quantity;

                // Ensure intraday_holdings and cash_holding are not null
                if (!userDetails.intraday_holdings) {
                    userDetails.intraday_holdings = { intraday_buy: 0, intraday_sell: 0 };
                }
                if (!userDetails.cash_holding) {
                    userDetails.cash_holding = { cash_in_hand: 10000000, intraday_profit_loss: 0 };
                }
                console.log(userDetails)
                console.log(parseFloat(userDetails['cash_holding'].cash_in_hand+10))
                console.log(parseFloat(userDetails['intraday_holdings'].intraday_buy+100))
                // Update intraday_buy and cash_in_hand
                const cash = parseFloat((userDetails['cash_holding'].cash_in_hand - totalCost).toFixed(2));
                const intraday = parseFloat((userDetails['intraday_holdings'].intraday_buy + totalCost).toFixed(2));

                // Send the updated user details to the backend to update the database
                fetch('http://localhost:8000/api/users/update-portfolio', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                    },
                    body: JSON.stringify({
                        email: userDetails.email,
                        intraday_holdings: intraday,
                        cash_holding: cash
                    })
                })
                .then(updateResponse => updateResponse.json())
                .then(updateData => {
                    if (updateData.message === 'Portfolio updated successfully') {
                        console.log('Portfolio updated successfully');
                        // Optionally, display a success message on the page
                        document.getElementById('feedback').innerText = 'Portfolio updated successfully';
                    } else {
                        console.error('Error updating portfolio:', updateData.error);
                        // Optionally, display an error message on the page
                        document.getElementById('feedback').innerText = 'Error updating portfolio';
                    }
                })
                .catch(error => console.error('Error updating portfolio:', error));
            } else {
                console.error('Error fetching stock price:', data.error);
            }
        })
        .catch(error => console.error('Error fetching stock price:', error));
});


function handleSell() {
    const tradeType = document.getElementById('tradeType').value;
    const quantity = document.getElementById('quantity').value;
    const buyPrice = document.getElementById('triggerPriceBuy').value;

    // Add your sell logic here
    console.log(`Selling ${quantity} shares at ${buyPrice} with trade type ${tradeType}`);
    document.getElementById('feedback').textContent = `Sold ${quantity} shares at ${buyPrice}`;
}

// Handle theme toggle
document.getElementById('themeToggle').addEventListener('click', function () {
    document.body.classList.toggle('bg-white');
    document.body.classList.toggle('bg-gray-900');
    document.body.classList.toggle('text-black');
    document.body.classList.toggle('text-white');
});


// Buy Button functionality
