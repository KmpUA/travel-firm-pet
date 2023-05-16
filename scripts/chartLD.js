const buttons = Array.from(document.querySelectorAll('.chart-btn'));
const modal = document.getElementById("myModal");
const span = document.querySelector('.close-chart');
const overlay = document.getElementById('overlay');

buttons.map(button => {
    button.addEventListener('click', (e) => {
        document.body.style.overflow = 'hidden';
        document.body.style.userSelect = "none";
        overlay.style.display = 'block';
        const type = e.originalTarget.id;
        renderChart(type);
        modal.style.display = 'block';
        span.style.display = 'block';
    });
})

function displayGraph() {
    let prices = document.querySelectorAll('.product-price');
    let graphData = [0, 0, 0];

    prices.forEach(function (price) {
        let priceValue = parseFloat(price.textContent.replace('$', ''));

        if (priceValue >= 100 && priceValue < 500) {
            graphData[0]++;
        } else if (priceValue >= 500 && priceValue < 1000) {
            graphData[1]++;
        } else if (priceValue >= 1000 && priceValue <= 2000) {
            graphData[2]++;
        }
    });
    return graphData;
}

function renderChart(type, graphData) {
    graphData = displayGraph();
    let ctx = document.getElementById("myChart").getContext('2d');
    let myChart = new Chart(ctx, {
        type: type,
        data: {
            labels: ["100$ - 500$", "500$ - 1000$", "1000$ - 2000$"],
            datasets: [{
                label: type,
                data: graphData,
                borderColor: 'rgba(75, 192, 192, 0.2)',
                backgroundColor: [random_rgba(), random_rgba(), random_rgba(), random_rgba()],
            }]
        },
        options: {
            legend: {
                labels: {
                    fontColor: "white",
                    fontSize: 30
                }
            },
            responsive: true,
            scales: {
                yAxes: [{
                    ticks: {
                        fontColor: "white",
                        fontSize: 25,
                        stepSize: 1,
                        beginAtZero: true
                    }
                }],
                xAxes: [{
                    ticks: {
                        fontColor: "white",
                        fontSize: 25,
                        stepSize: 1,
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}

function random_rgba() {
    var o = Math.round, r = Math.random, s = 255;
    return 'rgba(' + o(r() * s) + ',' + o(r() * s) + ',' + o(r() * s) + ',' + 1 + ')';
}

span.onclick = function () {
    modal.style.display = 'none';
    overlay.style.display = 'none';
    document.body.style.overflow = "auto";
    document.body.style.userSelect = "auto";
}

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}
