import { component$ } from '@builder.io/qwik';
import { BenchmarkApp } from "../components/router-head/BenchmarkApp" // Import the component

export default component$(() => {
  return (
    <div>
      <h1>Welcome to the Qwik Benchmark App</h1>
      <BenchmarkApp />  {/* Add the BenchmarkApp component */}
    </div>
  );
});
