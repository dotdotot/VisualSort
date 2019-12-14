# VisualAlgo

An animated visualization of sorting algorithms.

<h2>Animated Algorithms</h2>
<h3>Available</h3>
<ul>
<li>Bubble Sort</li>
<li>Comb Sort</li>
<li>Insertion Sort</li>
<li>Selection Sort</li>
</ul>

<h3>Ongoing</h3>
<ul>
<li>Merge Sort</li>
<li>Shell Sort</li>
</ul>

<h2>How Does It Work (<i>Under Construction</i>)</h2>

<h3>Animation Object</h3>
<p>The animation object contains the frames which holds the indeces of the elements to be highlighted and/or swapped.</p>
<p>The frames are essentially the stored "steps" of the algorithm.</p>

```javascript
Animation = {
    "frames":[
        {
            "elements":[],
            "highlights":[0, 1]
        },
        {
            "elements":[0, 1],
            "highlights":[0, 1]
        }
        .
        .
    ]
}
```
<h3>Usage</h3>
<p>The animation object is created in a sorting algorithm. <br> Particular events are stored as frames of the animation.</p>

```javascript
class Algorthims {
    static bubble(e) {
        let elements = e;
        let solution = new Animation();

        for (let i = 0; i < elements.length; ++i) {
            for (let j = 0; j < elements.length - i - 1; ++j) {
            
                // highlight adjacent elements
                let frame = new Frame();
                frame.addHighlights([j, j + 1]);
                solution.addFrame({ ...frame });

                if (elements[j] < elements[j + 1]) {
                    frame.reset();
                    
                    // Store indeces of to-be-swapped elements
                    frame.addElements([j, j + 1]);

                    let temp = elements[j];
                    elements[j] = elements[j + 1];
                    elements[j + 1] = temp;

                    // highlight swapped elements
                    frame.addHighlights([j, j + 1]);
                    solution.addFrame({ ...frame });
                }
            }
        }
        return solution;
    }
}
```
<h3>Animating the Algorithm</h3>
<p>The stored frames are played by a function that highlights the current elements in the frame and/or swaps them.</p>
