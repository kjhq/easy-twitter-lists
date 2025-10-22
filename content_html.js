let html = `
<button class="dropdown r-6gpygo add-to-list-container unselectable">
 <span class="unselectable" data-dropdown-btn>Add to List</span>
</button>
<style>
 .dropdown {
 position: relative;
 display: inline-block;
 padding: 10px 20px;
 z-index: 2147483647;
 margin-right: 8px;
 background-color: black;
 color: white;
 border-radius: 20px;
 touch-action: none;
 -webkit-tap-highlight-color: transparent;
 cursor: pointer;
 transition: background-color 0.2s;
 border: none;
 font-family: inherit;
 }
 .dropdown:hover {
 background-color: #1a1a1a;
 }
 .dropdown span {
 font-family: TwitterChirp, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
 font-weight: 500;
 font-size: 15px;
 z-index: 2147483647;
 }
 .dropdown-content {
 display: none;
 position: fixed;
 font-family: TwitterChirp, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
 font-weight: 500;
 min-width: 200px;
 background-color: #2a2a2a;
 border-radius: 12px;
 z-index: 2147483647;
 touch-action: none;
 overflow: hidden;
 box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
 }
 .dropdown-content.show {
 display: block;
 z-index: 2147483647;
 }
 .unselectable {
 -webkit-touch-callout: none;
 -webkit-user-select: none;
 -khtml-user-select: none;
 -moz-user-select: none;
 -ms-user-select: none;
 user-select: none;
 }
 .dropdown-content button {
 display: block;
 width: 100%;
 padding: 14px 20px;
 border: none;
 background: none;
 cursor: pointer;
 transition: background-color 0.2s;
 color: white;
 text-align: left;
 font-family: inherit;
 font-size: 15px;
 font-weight: 500;
 z-index: 2147483647;
 position: relative;
 }
 .dropdown-content button:hover {
 background-color: #3a3a3a;
 }
 .dropdown-content button:active {
 background-color: #4a4a4a;
 }
 .dropdown-content button.selected {
 background-color: #1d9bf0;
 color: white;
 }
 .dropdown-content button.selected:hover {
 background-color: #1a8cd8;
 }
 .dropdown-content button.selected::after {
 content: '✓';
 position: absolute;
 right: 20px;
 font-weight: bold;
 }
 @media (max-width: 768px) {
 .dropdown {
 padding: 12px 22px;
 }
 .dropdown-content {
 min-width: 220px;
 }
 .dropdown-content button {
 padding: 16px 22px;
 font-size: 16px;
 }
 }
</style>
`