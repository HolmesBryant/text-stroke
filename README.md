# Text Stroke Web Component

Adds a text stroke to some text.

Demo: https://holmesbryant.github.io/text-stroke/

### Attributes
* [strokecolor] optional (default: inherit) The color of the stroke.
* [strokewidth] optional (default: "2px") The width of the stroke.

## Note:

The text must be wrapped inside an HTML element (h1, p, span etc). If it is not, it will automatically be wrapped in an h1 element.

### Usage

    <script type="module" src="text-stroke.js"></script>
    <text-stroke>Some Text to Stroke</text-stroke>
