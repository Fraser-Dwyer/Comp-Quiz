import "../styles/MyHistogram.css";
import { useSelector } from "react-redux";
import { Bar } from "react-chartjs-2";
import { Chart, registerables, CategoryScale } from "chart.js";
Chart.register(...registerables);
Chart.register(CategoryScale);

const MyHistogram = ({ allUsers, allScores }) => {
  const myUserName = useSelector((state) => state.user.name);
  const userColour = "blue";
  const nonUserColour = "grey";

  // positioning index from: https://stackoverflow.com/questions/13627308/add-st-nd-rd-and-th-ordinal-suffix-to-a-number
  function ordinal_suffix_of(i) {
    var j = i % 10,
      k = i % 100;
    if (j == 1 && k != 11) {
      return i + "st";
    }
    if (j == 2 && k != 12) {
      return i + "nd";
    }
    if (j == 3 && k != 13) {
      return i + "rd";
    }
    return i + "th";
  }

  // create people array
  const person = [];
  if (allUsers !== null) {
    for (let i = 0; i < allUsers.length; i++) {
      var temp = {
        username: allUsers[i].username,
        displayName: allUsers[i].displayName,
        score: allScores[i].score,
        image: allUsers[i].image,
      };
      person.push(temp);
    }
  }

  // Sorting the leaderboard by score
  function sortScore(a, b) {
    const diff = a.score - b.score;
    return -1 * diff;
  }

  if (person.length !== 0) {
    person.sort((a, b) => sortScore(a, b));
  }

  // finding the user's percentile
  const position = person.findIndex((obj) => obj.username === myUserName) + 1;
  const percentile = ordinal_suffix_of(
    (((person.length - position) * 100) / person.length).toFixed(0)
  );

  const scores = [];
  const xLabels = [];
  const yLabels = [];
  const yLabelsHighlight = [];
  const columnColours = [];
  if (allUsers !== null) {
    // finding points of place above user
    var pointsBehind = 0;
    var positionBehind = 0;
    var winning = false;
    positionBehind = ordinal_suffix_of(position - 1);
    if (position !== 1) {
      pointsBehind = person[position - 2].score - person[position - 1].score;
      winning = false;
    } else if (position === 1) {
      pointsBehind = person[position - 1].score - person[position].score;
      winning = true;
    }
    // see if its a point or points
    if (pointsBehind == 1) {
      pointsBehind = String(pointsBehind).concat(" point");
    } else {
      pointsBehind = String(pointsBehind).concat(" points");
    }

    // Get lowest and highest number from scores
    for (let i = 0; i < allUsers.length; i++) {
      scores.push(allScores[i].score);
    }
    const high = Math.max.apply(null, scores);
    const low = Math.min.apply(null, scores);
    const numberOfBins = Math.ceil(Math.sqrt(allUsers.length));

    // find the widths of the bins used
    const widths = [];
    const quantity = {};
    const quantityHighlight = [];
    for (let i = low; i < high + numberOfBins; i = i + numberOfBins) {
      widths.push(i);
      quantity[i] = 0;
      quantityHighlight[i] = 0;
    }

    // Find where my user is score wise
    const myUserIndex = person.findIndex((obj) => obj.username === myUserName);
    const myuserScore = person[myUserIndex].score;

    // Find the frequency in each bin
    for (let i = 0; i < widths.length - 1; i++) {
      for (let j = 0; j < scores.length; j++) {
        if (scores[j] >= widths[i] && scores[j] < widths[i + 1]) {
          quantity[widths[i]] = quantity[widths[i]] + 1;
        }
      }
    }

    // Find the right bin for our user
    for (let i = 0; i < widths.length - 1; i++) {
      if (myuserScore >= widths[i] && myuserScore < widths[i + 1]) {
        quantityHighlight[widths[i]] = 1;
      }
    }
    for (var key in quantityHighlight) {
      yLabelsHighlight.push(quantityHighlight[key]);
    }

    // set the ylabel to values from the frequency data
    for (var key in quantity) {
      yLabels.push(quantity[key]);
    }

    // Set right colour for user column in histogram
    for (var each in yLabelsHighlight) {
      if (yLabelsHighlight[each] === 1) {
        columnColours.push(userColour);
      } else {
        columnColours.push(nonUserColour);
      }
    }

    // get the bin widths as labels
    for (let i = 0; i < widths.length - 1; i++) {
      var lab = String(widths[i])
        .concat("≤x<")
        .concat(widths[i + 1]);
      xLabels.push(lab);
    }
    //var finalUpper = parseInt(widths.slice(-1)) + numberOfBins;
    //var finalLower = widths.slice(-1);
    //xLabels.push(String(finalLower).concat("≤x<").concat(finalUpper));
  }

  return (
    <div>
      <h2 className="datavistitle">Histogram</h2>
      {
        <div className="backing">
          <div className="histocontainer">
            <Bar
              data={{
                // Name of the variables on x-axies for each bar
                labels: xLabels,
                datasets: [
                  {
                    // Data or value of your each variable
                    data: yLabels,
                    // Color of each bar
                    backgroundColor: columnColours,
                    // Border color of each bar
                    borderColor: columnColours,
                    borderWidth: 0.5,
                  },
                ],
              }}
              // Height of graph
              height={400}
              options={{
                maintainAspectRatio: false,
                scales: {
                  y: {
                    ticks: {
                      // The y-axis value will start from zero
                      stepSize: 1,
                      beginAtZero: true,
                    },
                    title: {
                      display: true,
                      text: "Number of Users",
                    },
                  },
                  x: {
                    title: {
                      display: true,
                      text: "Score Range",
                    },
                  },
                },
                plugins: {
                  legend: {
                    display: false,
                    labels: {
                      fontSize: 12,
                    },
                  },
                },
              }}
            />
            <div className="explain">
              <p>
                <b>You are in the {percentile} percentile</b>
              </p>
              <p>and you have {person[position - 1].score} points</p>
              {!winning && (
                <p>
                  You are {pointsBehind} behind {positionBehind} place
                </p>
              )}
              {winning && <p>You are {pointsBehind} ahead of 2nd place</p>}
            </div>
          </div>
        </div>
      }
    </div>
  );
};

export default MyHistogram;
