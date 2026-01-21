# Algorithm Visualizer

An interactive web application that visualizes sorting and searching algorithms step-by-step to help users understand how algorithms work internally. Built with React, Next.js, and TypeScript.

## Live Demo

[Live Demo](https://algorithm-visualizer.vercel.app) - Deploy this project on Vercel for a live demonstration.

## Features

### Supported Algorithms

#### Sorting Algorithms
- **Bubble Sort** - O(n²) simple comparison-based sorting
- **Selection Sort** - O(n²) finds minimum and moves to sorted portion
- **Insertion Sort** - O(n) to O(n²) builds sorted array incrementally
- **Merge Sort** - O(n log n) divide and conquer approach
- **Quick Sort** - O(n log n) average, O(n²) worst case with partitioning

#### Searching Algorithms
- **Linear Search** - O(n) sequential search through array
- **Binary Search** - O(log n) efficient search on sorted data

### Visualization Features
- **Color-Coded States**: Visual distinction between compared, swapped, sorted, and highlighted elements
- **Smooth Animations**: requestAnimationFrame-based rendering for fluid animations
- **Real-time Statistics**: Track comparisons, swaps/moves, and progress
- **Time Complexity Display**: Shows best, average, and worst case complexities
- **Speed Control**: Adjustable animation speed (slow to fast)
- **Array Size Control**: Test algorithms with varying input sizes (10-150 elements)
- **Step-by-Step Mode**: Pause and manually step through each operation
- **Responsive Design**: Works seamlessly on desktop and mobile devices

### User Interface
- Modern dark mode aesthetic with professional design
- Interactive control panel with intuitive controls
- Real-time statistics display including comparisons and swaps
- Color legend for understanding visualization states
- Algorithm complexity information
- Progress tracker showing current step and total steps

## Tech Stack

- **React 19** - UI component framework
- **Next.js 16** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS v4** - Utility-first CSS framework
- **shadcn/ui** - High-quality React components
- **Lucide Icons** - Beautiful icon library

## Project Structure

```
algorithm-visualizer/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── globals.css         # Global styles and theme
│   ├── page.tsx            # Home page
│   └── favicon.ico         # App icon
├── components/
│   ├── AlgorithmVisualizer.tsx    # Main container with state management
│   ├── VisualizationCanvas.tsx    # Canvas-based visualization
│   ├── ControlPanel.tsx           # User controls
│   ├── ComplexityDisplay.tsx      # Complexity information
│   ├── StatsDisplay.tsx           # Statistics display
│   └── ui/                        # shadcn/ui components
├── lib/
│   ├── algorithms.ts      # All algorithm implementations
│   └── utils.ts           # Utility functions
├── hooks/
│   └── use-toast.ts       # Toast notifications hook
├── public/                # Static assets
├── next.config.mjs        # Next.js configuration
├── tsconfig.json          # TypeScript configuration
└── package.json           # Dependencies and scripts
```

## Installation

### Using the shadcn CLI (Recommended)

```bash
# Create a new Next.js project with shadcn
npx create-next-app@latest my-algorithm-visualizer --typescript
cd my-algorithm-visualizer

# Install dependencies
npm install

# Clone this project's components and logic
# Or copy the files from this repository
```

### Manual Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/algorithm-visualizer.git
cd algorithm-visualizer
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) to view the application.

## Usage

1. **Select an Algorithm**: Choose from the algorithm dropdown menu
2. **Adjust Parameters**:
   - Array Size: 10-150 elements
   - Speed: Slow to Fast animation speed
   - Search Target (for search algorithms): Value to search for
3. **Start Visualization**: Click the "Start" button
4. **Control Playback**:
   - Pause/Resume to control animation
   - Step through individual operations
   - Reset to restart the visualization

## Algorithm Implementations

### Sorting Algorithms

All sorting algorithms are implemented using generators for efficient step-by-step yielding:

```typescript
export function* bubbleSort(array: number[]): Generator<AlgorithmStep>
```

Each algorithm yields `AlgorithmStep` objects containing:
- `array`: Current state of the array
- `compared`: Indices being compared
- `swapped`: Indices being swapped
- `sorted`: Indices in final sorted position
- `highlight`: Currently active indices

### Searching Algorithms

Searching algorithms track comparison operations:

```typescript
export function* linearSearch(array: number[], target: number): Generator<AlgorithmStep>
export function* binarySearch(array: number[], target: number): Generator<AlgorithmStep>
```

## Performance Optimization

- **Efficient State Management**: Uses React hooks with minimal re-renders
- **Canvas Rendering**: Direct canvas API for smooth visualization
- **Generator Functions**: Produces algorithm steps on-demand
- **Optimized Animation Loop**: requestAnimationFrame-based timing
- **Large Input Support**: Handles arrays up to 150 elements smoothly

## Color Scheme

The application uses a sophisticated dark mode color palette:

- **Background**: Deep dark gray (#1f1f28)
- **Primary**: Purple accent (#8b5cf6)
- **Comparing**: Blue (#64b4ff)
- **Swapping**: Red (#ff6464)
- **Sorted**: Green (#a8e691)
- **Highlight**: Orange (#ffb464)

## Responsive Design

The application is fully responsive:
- Desktop: Full-featured layout with controls on the right
- Tablet: Adjusted spacing and control placement
- Mobile: Stacked layout with touch-friendly controls

## Educational Features

- **Complexity Analysis**: View time and space complexity for each algorithm
- **Statistics Tracking**: Monitor comparisons and operations
- **Visual Feedback**: Immediate visual representation of algorithm behavior
- **Speed Control**: Slow down to understand each step
- **Step Mode**: Advance one operation at a time

## Deployment

### Deploy on Vercel

1. Push your code to GitHub:
```bash
git push origin main
```

2. Visit [vercel.com](https://vercel.com) and connect your GitHub repository

3. Vercel will automatically detect Next.js and deploy your application

4. Your app will be live at a URL like: `https://algorithm-visualizer.vercel.app`

### Environment Variables

No environment variables are required for this project. It's fully self-contained.

### Build for Production

```bash
npm run build
npm start
```

## Browser Compatibility

- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support
- Mobile browsers: Full support (iOS Safari, Chrome Mobile)

## Future Enhancements

- Additional algorithms: Heap Sort, Radix Sort, Shell Sort
- Custom array input
- Sound effects for operations
- Algorithm comparison mode
- Code snippet display
- Tutorial mode for beginners
- Performance metrics graph
- Theme customization

## Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues for bugs and feature requests.

## License

This project is open source and available under the MIT License.

## Author

Created with Next.js and React for educational purposes.

## Resources

- [Algorithm Visualization Best Practices](https://www.cs.usfca.edu/~galles/visualization/Algorithms.html)
- [Big O Notation Guide](https://www.bigocheatsheet.com/)
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

---

**Happy Learning!** Visualize, understand, and master algorithms.
