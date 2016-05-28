function DrawGraph(){
    var labelsArray = localStorage.getItem("dataPoints");
    var chrt = document.getElementById("mycanvas").getContext("2d");
    var myarr = [65, 59, 80, 81, 56, 55, 40,100];
    var xaxis = ["January", "February", "March", "April", "May", "June", "July", "August"];
    var data = {
    labels: labelsArray ,
    datasets: [
        {
            label: "My First dataset",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [65, 59, 80, 81, 56, 55, 40],
        }
    ]
};

    var myFirstChart = new Chart(chrt).Line(data);
  }
