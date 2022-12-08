import './App.css';
import {useEffect} from "react";

function App() {

    useEffect(() => {
        const item = document.getElementById("item")
        const field = document.getElementById('field')
        let limits = {
            top: field.offsetTop,
            right: field.offsetWidth + field.offsetLeft,
            bottom: field.offsetHeight + field.offsetTop,
            left: field.offsetLeft
        };
        window.addEventListener('resize', function() {
            limits = {
                top: field.offsetTop,
                right: field.offsetWidth + field.offsetLeft,
                bottom: field.offsetHeight + field.offsetTop,
                left: field.offsetLeft
            };
        });
        let isDrag = false

        item.onmousedown = function(e) {
            isDrag = true;
            const bias_x = e.pageX - item.offsetLeft
            const bias_y = e.pageY - item.offsetTop
            function move(e) {
                if (!isDrag) return
                let newLocation = {
                    x: limits.left,
                    y: limits.top
                };
                if (e.pageX - bias_x + item.offsetWidth > limits.right) {
                    newLocation.x = limits.right - item.offsetWidth;
                } else if (e.pageX - bias_x> limits.left) {
                    newLocation.x = e.pageX - bias_x;
                }
                if (e.pageY - bias_y + item.offsetHeight > limits.bottom) {
                    newLocation.y = limits.bottom - item.offsetHeight ;
                } else if (e.pageY - bias_y> limits.top ) {
                    newLocation.y = e.pageY - bias_y;
                }
                relocate(newLocation);
            }
            function relocate(newLocation) {
                item.style.left = newLocation.x  + 'px';
                item.style.top = newLocation.y  + 'px';
            }
            document.addEventListener('mousemove', move);

            item.onmouseup = function() {
                document.removeEventListener('mousemove', move);
                item.onmouseup = null
            };
            item.ondragend = () => {
                document.removeEventListener('mousemove', move);
            }
        }
        item.ondragstart = function() {
            return false;
        };

        document.onmouseup = function() {
            isDrag = false;
        }

    }, )

    return (
        <div className="App">
            <div className="truncated_field" id='field'>
                <img id="item" src="morgen.png" />
            </div>
        </div>
    );
}

export default App;
