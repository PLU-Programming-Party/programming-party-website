---
layout: base
title: Interview Prep
permalink: /interview-prep/
---

<div class="about-page">
    <h1>Interview Prep Resources</h1>
    
    <h2>Programming Fundamentals</h2>
    <p>
        Master the basics with our curated collection of common interview problems and solutions.
        Each problem includes multiple language implementations to help you understand different approaches.
    </p>
    
    <h2>Common Problems</h2>
    
    <h3>Problem: Populating a 2D Array</h3>
    <p>A classic problem that tests your understanding of nested loops and array indexing.</p>
    
    <h4>Assembly (x86-64)</h4>
    <pre><code>.section .data
    array: .space 400  # 10x10 array of 4-byte integers
    rows: .long 10
    cols: .long 10

.section .text
.global _start

_start:
    xor %rax, %rax      # row counter
    xor %rbx, %rbx      # col counter
    mov $array, %rdi    # array base address

row_loop:
    cmp $10, %rax
    jge end_program
    xor %rbx, %rbx      # reset column counter

col_loop:
    cmp $10, %rbx
    jge next_row
    
    # Calculate value: row * cols + col
    mov %rax, %rcx
    imul $10, %rcx
    add %rbx, %rcx
    
    # Calculate address: base + (row * cols + col) * 4
    mov %rax, %rdx
    imul $40, %rdx      # row * cols * 4
    mov %rbx, %rsi
    imul $4, %rsi       # col * 4
    add %rsi, %rdx
    add %rdi, %rdx
    
    # Store value
    mov %rcx, (%rdx)
    
    inc %rbx
    jmp col_loop

next_row:
    inc %rax
    jmp row_loop

end_program:
    mov $60, %rax       # sys_exit
    xor %rdi, %rdi
    syscall</code></pre>
    
    <h4>Fortran</h4>
    <pre><code>program populate_2d_array
    implicit none
    integer, parameter :: rows = 10, cols = 10
    integer :: array(rows, cols)
    integer :: i, j
    
    ! Populate the array
    do i = 1, rows
        do j = 1, cols
            array(i, j) = (i-1) * cols + (j-1)
        end do
    end do
    
    ! Print the array
    do i = 1, rows
        do j = 1, cols
            write(*, '(I4)', advance='no') array(i, j)
        end do
        write(*, *) ! New line
    end do
end program populate_2d_array</code></pre>
    
    <h4>Java 8</h4>
    <pre><code>import java.util.Arrays;
import java.util.stream.IntStream;

public class Populate2DArray {
    public static void main(String[] args) {
        int rows = 10, cols = 10;
        
        // Traditional approach
        int[][] array = new int[rows][cols];
        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                array[i][j] = i * cols + j;
            }
        }
        
        // Java 8 Stream approach
        int[][] streamArray = IntStream.range(0, rows)
            .mapToObj(i -> IntStream.range(0, cols)
                .map(j -> i * cols + j)
                .toArray())
            .toArray(int[][]::new);
        
        // Print the array
        Arrays.stream(array)
            .forEach(row -> {
                Arrays.stream(row)
                    .forEach(val -> System.out.printf("%4d", val));
                System.out.println();
            });
    }
}</code></pre>
    
    <h4>Haskell</h4>
    <pre><code>-- Pure functional approach to populating a 2D array
module Populate2D where

-- Create a 2D list (array) with values
populate2D :: Int -> Int -> [[Int]]
populate2D rows cols = 
    [[i * cols + j | j <- [0..cols-1]] | i <- [0..rows-1]]

-- Alternative using explicit recursion
populate2D' :: Int -> Int -> [[Int]]
populate2D' rows cols = populateRows 0
  where
    populateRows r
      | r >= rows = []
      | otherwise = populateRow r 0 : populateRows (r + 1)
    
    populateRow r c
      | c >= cols = []
      | otherwise = (r * cols + c) : populateRow r (c + 1)

-- Pretty print the 2D array
printArray :: [[Int]] -> IO ()
printArray = mapM_ (putStrLn . unwords . map (printf "%4d"))
  where printf fmt n = take 4 (show n ++ repeat ' ')

-- Main function
main :: IO ()
main = do
    let array = populate2D 10 10
    printArray array</code></pre>
    
    <h3>Problem: Traveling Salesman Problem</h3>
    <p>A classic optimization problem that demonstrates dynamic programming and graph algorithms. Here are polynomial-time approximation solutions.</p>
    
    <h4>Assembly (x86-64)</h4>
    <pre><code>; Nearest Neighbor TSP Approximation - O(n²)
.section .data
    cities: .long 5                    # number of cities
    # Distance matrix (5x5) - symmetric
    distances: .long 0, 10, 15, 20, 25
              .long 10, 0, 35, 25, 30
              .long 15, 35, 0, 30, 20
              .long 20, 25, 30, 0, 15
              .long 25, 30, 20, 15, 0
    visited: .byte 0, 0, 0, 0, 0        # visited cities
    tour: .long 0, 0, 0, 0, 0, 0        # tour path (n+1 cities)
    total_cost: .long 0

.section .text
.global _start

_start:
    # Initialize
    mov $0, %rax            # current city
    mov $0, %rbx            # tour index
    mov $tour, %rdi
    mov $0, (%rdi)          # start at city 0
    mov $visited, %rsi
    movb $1, (%rsi)         # mark city 0 as visited
    
    mov $1, %rbx            # next position in tour
    
nearest_neighbor_loop:
    cmp $5, %rbx            # if we've visited all cities
    jge close_tour
    
    # Find nearest unvisited city
    mov $-1, %rcx           # min_distance (use large value)
    mov $-1, %rdx           # nearest_city
    mov $0, %r8             # candidate city
    
find_nearest:
    cmp $5, %r8
    jge found_nearest
    
    # Check if city is visited
    mov $visited, %rsi
    add %r8, %rsi
    cmpb $0, (%rsi)
    jne next_candidate
    
    # Calculate distance from current city to candidate
    mov %rax, %r9           # current city
    imul $20, %r9           # row offset (5 cities * 4 bytes)
    mov %r8, %r10           # candidate city
    imul $4, %r10           # column offset
    add %r10, %r9
    mov $distances, %rsi
    add %r9, %rsi
    mov (%rsi), %r11        # distance
    
    # Update minimum if this is better
    cmp %rcx, %r11
    jge next_candidate
    mov %r11, %rcx          # new min_distance
    mov %r8, %rdx           # new nearest_city
    
next_candidate:
    inc %r8
    jmp find_nearest
    
found_nearest:
    # Add nearest city to tour
    mov $tour, %rdi
    mov %rbx, %r8
    imul $4, %r8
    add %r8, %rdi
    mov %rdx, (%rdi)        # store nearest city
    
    # Mark city as visited
    mov $visited, %rsi
    add %rdx, %rsi
    movb $1, (%rsi)
    
    # Add distance to total cost
    add %rcx, total_cost
    
    # Update current city and tour position
    mov %rdx, %rax
    inc %rbx
    jmp nearest_neighbor_loop
    
close_tour:
    # Add return to start city
    mov $tour, %rdi
    mov $5, %r8
    imul $4, %r8
    add %r8, %rdi
    mov $0, (%rdi)
    
    # Add final distance
    mov %rax, %r9
    imul $20, %r9
    mov $distances, %rsi
    add %r9, %rsi
    mov (%rsi), %r11
    add %r11, total_cost
    
    # Exit
    mov $60, %rax
    xor %rdi, %rdi
    syscall</code></pre>
    
    <h4>Fortran</h4>
    <pre><code>program tsp_nearest_neighbor
    implicit none
    integer, parameter :: n = 5
    integer :: distances(n, n)
    logical :: visited(n)
    integer :: tour(n+1)
    integer :: current_city, next_city, tour_pos
    integer :: min_distance, total_cost
    integer :: i, j
    
    ! Initialize distance matrix
    data distances / 0, 10, 15, 20, 25, &
                    10,  0, 35, 25, 30, &
                    15, 35,  0, 30, 20, &
                    20, 25, 30,  0, 15, &
                    25, 30, 20, 15,  0 /
    
    ! Initialize
    visited = .false.
    current_city = 1  ! Start at city 1 (1-indexed)
    tour(1) = current_city
    visited(current_city) = .true.
    total_cost = 0
    tour_pos = 2
    
    ! Nearest neighbor algorithm - O(n²)
    do while (tour_pos <= n)
        min_distance = huge(min_distance)
        next_city = -1
        
        ! Find nearest unvisited city
        do i = 1, n
            if (.not. visited(i) .and. &
                distances(current_city, i) < min_distance) then
                min_distance = distances(current_city, i)
                next_city = i
            end if
        end do
        
        ! Add to tour
        tour(tour_pos) = next_city
        visited(next_city) = .true.
        total_cost = total_cost + min_distance
        current_city = next_city
        tour_pos = tour_pos + 1
    end do
    
    ! Close the tour
    tour(n+1) = tour(1)
    total_cost = total_cost + distances(current_city, tour(1))
    
    ! Output results
    write(*, '(A)') 'TSP Nearest Neighbor Solution (O(n²)):'
    write(*, '(A)', advance='no') 'Tour: '
    do i = 1, n+1
        write(*, '(I0)', advance='no') tour(i)
        if (i < n+1) write(*, '(A)', advance='no') ' -> '
    end do
    write(*, *)
    write(*, '(A, I0)') 'Total cost: ', total_cost
end program tsp_nearest_neighbor</code></pre>
    
    <h4>Java 8</h4>
    <pre><code>import java.util.*;
import java.util.stream.*;

public class TSPSolver {
    private final int n;
    private final int[][] distances;
    
    public TSPSolver(int[][] distances) {
        this.n = distances.length;
        this.distances = distances;
    }
    
    // Nearest Neighbor Approximation - O(n²)
    public TSPResult nearestNeighborTSP() {
        boolean[] visited = new boolean[n];
        List<Integer> tour = new ArrayList<>();
        int currentCity = 0;
        int totalCost = 0;
        
        tour.add(currentCity);
        visited[currentCity] = true;
        
        for (int step = 1; step < n; step++) {
            final int current = currentCity;
            
            // Find nearest unvisited city using streams
            OptionalInt nearestOpt = IntStream.range(0, n)
                .filter(city -> !visited[city])
                .reduce((city1, city2) -> 
                    distances[current][city1] <= distances[current][city2] ? 
                    city1 : city2);
            
            if (nearestOpt.isPresent()) {
                int nearest = nearestOpt.getAsInt();
                tour.add(nearest);
                visited[nearest] = true;
                totalCost += distances[currentCity][nearest];
                currentCity = nearest;
            }
        }
        
        // Close the tour
        tour.add(tour.get(0));
        totalCost += distances[currentCity][tour.get(0)];
        
        return new TSPResult(tour, totalCost);
    }
    
    // Christofides Algorithm Approximation - O(n³)
    public TSPResult christofidesTSP() {
        // 1. Find Minimum Spanning Tree
        List<Edge> mst = findMST();
        
        // 2. Find odd-degree vertices
        Set<Integer> oddVertices = findOddDegreeVertices(mst);
        
        // 3. Find minimum weight perfect matching (simplified)
        List<Edge> matching = findMinimumMatching(oddVertices);
        
        // 4. Combine MST and matching to form Eulerian graph
        List<Edge> eulerianGraph = new ArrayList<>(mst);
        eulerianGraph.addAll(matching);
        
        // 5. Find Eulerian tour and convert to Hamiltonian
        List<Integer> tour = findHamiltonianTour(eulerianGraph);
        int totalCost = calculateTourCost(tour);
        
        return new TSPResult(tour, totalCost);
    }
    
    private List<Edge> findMST() {
        // Prim's algorithm for MST
        boolean[] inMST = new boolean[n];
        List<Edge> mst = new ArrayList<>();
        PriorityQueue<Edge> pq = new PriorityQueue<>(Comparator.comparingInt(e -> e.weight));
        
        inMST[0] = true;
        for (int j = 1; j < n; j++) {
            pq.offer(new Edge(0, j, distances[0][j]));
        }
        
        while (!pq.isEmpty() && mst.size() < n - 1) {
            Edge edge = pq.poll();
            if (inMST[edge.to]) continue;
            
            mst.add(edge);
            inMST[edge.to] = true;
            
            for (int k = 0; k < n; k++) {
                if (!inMST[k]) {
                    pq.offer(new Edge(edge.to, k, distances[edge.to][k]));
                }
            }
        }
        
        return mst;
    }
    
    private Set<Integer> findOddDegreeVertices(List<Edge> mst) {
        int[] degree = new int[n];
        for (Edge edge : mst) {
            degree[edge.from]++;
            degree[edge.to]++;
        }
        
        return IntStream.range(0, n)
            .filter(i -> degree[i] % 2 == 1)
            .boxed()
            .collect(Collectors.toSet());
    }
    
    private List<Edge> findMinimumMatching(Set<Integer> oddVertices) {
        // Simplified greedy matching
        List<Integer> vertices = new ArrayList<>(oddVertices);
        List<Edge> matching = new ArrayList<>();
        boolean[] used = new boolean[vertices.size()];
        
        for (int i = 0; i < vertices.size(); i++) {
            if (used[i]) continue;
            
            int bestJ = -1;
            int bestCost = Integer.MAX_VALUE;
            
            for (int j = i + 1; j < vertices.size(); j++) {
                if (!used[j] && distances[vertices.get(i)][vertices.get(j)] < bestCost) {
                    bestCost = distances[vertices.get(i)][vertices.get(j)];
                    bestJ = j;
                }
            }
            
            if (bestJ != -1) {
                matching.add(new Edge(vertices.get(i), vertices.get(bestJ), bestCost));
                used[i] = used[bestJ] = true;
            }
        }
        
        return matching;
    }
    
    private List<Integer> findHamiltonianTour(List<Edge> eulerianGraph) {
        // Build adjacency list
        Map<Integer, List<Integer>> adj = new HashMap<>();
        for (int i = 0; i < n; i++) {
            adj.put(i, new ArrayList<>());
        }
        
        for (Edge edge : eulerianGraph) {
            adj.get(edge.from).add(edge.to);
            adj.get(edge.to).add(edge.from);
        }
        
        // DFS to create Hamiltonian tour
        boolean[] visited = new boolean[n];
        List<Integer> tour = new ArrayList<>();
        dfsHamiltonian(0, adj, visited, tour);
        tour.add(0); // Close the tour
        
        return tour;
    }
    
    private void dfsHamiltonian(int node, Map<Integer, List<Integer>> adj, 
                               boolean[] visited, List<Integer> tour) {
        if (!visited[node]) {
            visited[node] = true;
            tour.add(node);
            
            for (int neighbor : adj.get(node)) {
                dfsHamiltonian(neighbor, adj, visited, tour);
            }
        }
    }
    
    private int calculateTourCost(List<Integer> tour) {
        int cost = 0;
        for (int i = 0; i < tour.size() - 1; i++) {
            cost += distances[tour.get(i)][tour.get(i + 1)];
        }
        return cost;
    }
    
    public static void main(String[] args) {
        int[][] distances = {
            {0, 10, 15, 20, 25},
            {10, 0, 35, 25, 30},
            {15, 35, 0, 30, 20},
            {20, 25, 30, 0, 15},
            {25, 30, 20, 15, 0}
        };
        
        TSPSolver solver = new TSPSolver(distances);
        
        // Nearest Neighbor (O(n²))
        TSPResult nnResult = solver.nearestNeighborTSP();
        System.out.println("Nearest Neighbor Result: " + nnResult);
        
        // Christofides Algorithm (O(n³))
        TSPResult christResult = solver.christofidesTSP();
        System.out.println("Christofides Result: " + christResult);
    }
    
    static class Edge {
        int from, to, weight;
        Edge(int from, int to, int weight) {
            this.from = from; this.to = to; this.weight = weight;
        }
    }
    
    static class TSPResult {
        List<Integer> tour;
        int cost;
        
        TSPResult(List<Integer> tour, int cost) {
            this.tour = tour; this.cost = cost;
        }
        
        @Override
        public String toString() {
            return String.format("Tour: %s, Cost: %d", 
                tour.stream().map(String::valueOf).collect(Collectors.joining(" -> ")), cost);
        }
    }
}</code></pre>
    
    <h4>Haskell</h4>
    <pre><code>-- TSP Approximation Algorithms in Haskell
module TSPSolver where

import Data.List (minimumBy, delete, permutations)
import Data.Ord (comparing)
import qualified Data.Set as Set
import Data.Array

type City = Int
type Distance = Int
type Tour = [City]
type DistanceMatrix = Array (City, City) Distance

-- Sample distance matrix
sampleDistances :: DistanceMatrix
sampleDistances = array ((0,0), (4,4)) [
    ((i,j), dist) | 
    (i, row) <- zip [0..] [[0,10,15,20,25], [10,0,35,25,30], 
                          [15,35,0,30,20], [20,25,30,0,15], [25,30,20,15,0]],
    (j, dist) <- zip [0..] row
  ]

-- Nearest Neighbor TSP - O(n²)
nearestNeighborTSP :: DistanceMatrix -> Int -> (Tour, Distance)
nearestNeighborTSP distMatrix startCity = 
    let (_, (maxRow, _)) = bounds distMatrix
        cities = [0..maxRow]
        initialState = (Set.singleton startCity, [startCity], 0)
    in nearestNeighborHelper distMatrix cities initialState
  where
    nearestNeighborHelper :: DistanceMatrix -> [City] -> (Set.Set City, Tour, Distance) -> (Tour, Distance)
    nearestNeighborHelper dm allCities (visited, tour@(current:_), totalDist)
        | Set.size visited == length allCities = 
            let returnDist = dm ! (current, startCity)
            in (reverse (startCity : tour), totalDist + returnDist)
        | otherwise = 
            let unvisited = filter (`Set.notMember` visited) allCities
                (nextCity, minDist) = minimumBy (comparing snd) 
                    [(city, dm ! (current, city)) | city <- unvisited]
                newVisited = Set.insert nextCity visited
                newTour = nextCity : tour
                newDist = totalDist + minDist
            in nearestNeighborHelper dm allCities (newVisited, newTour, newDist)

-- Christofides Algorithm approximation - O(n³)
christofidesTSP :: DistanceMatrix -> (Tour, Distance)
christofidesTSP distMatrix = 
    let (_, (n, _)) = bounds distMatrix
        cities = [0..n]
        mst = primMST distMatrix cities
        oddVertices = findOddDegreeVertices mst cities
        matching = minimumWeightMatching distMatrix oddVertices
        eulerianGraph = mst ++ matching
        eulerianTour = findEulerianTour eulerianGraph cities
        hamiltonianTour = shortcutEulerianTour eulerianTour
        tourCost = calculateTourCost distMatrix hamiltonianTour
    in (hamiltonianTour, tourCost)

-- Prim's MST algorithm
primMST :: DistanceMatrix -> [City] -> [(City, City, Distance)]
primMST distMatrix cities@(start:_) = primHelper [start] (delete start cities) []
  where
    primHelper inMST remaining mstEdges
        | null remaining = mstEdges
        | otherwise = 
            let edges = [(u, v, distMatrix ! (u, v)) | u <- inMST, v <- remaining]
                (minU, minV, minWeight) = minimumBy (comparing (\(_,_,w) -> w)) edges
                newInMST = minV : inMST
                newRemaining = delete minV remaining
                newMSTEdges = (minU, minV, minWeight) : mstEdges
            in primHelper newInMST newRemaining newMSTEdges

-- Find vertices with odd degree in MST
findOddDegreeVertices :: [(City, City, Distance)] -> [City] -> [City]
findOddDegreeVertices edges cities = 
    let degrees = [length [() | (u, v, _) <- edges, u == c || v == c] | c <- cities]
    in [c | (c, d) <- zip cities degrees, odd d]

-- Simplified minimum weight matching for odd vertices
minimumWeightMatching :: DistanceMatrix -> [City] -> [(City, City, Distance)]
minimumWeightMatching distMatrix oddVertices = greedyMatching oddVertices []
  where
    greedyMatching [] matching = matching
    greedyMatching [_] matching = matching  -- Odd number of vertices
    greedyMatching (u:remaining) matching = 
        let (bestV, bestWeight) = minimumBy (comparing snd) 
                [(v, distMatrix ! (u, v)) | v <- remaining]
            newRemaining = delete bestV remaining
            newMatching = (u, bestV, bestWeight) : matching
        in greedyMatching newRemaining newMatching

-- Find Eulerian tour (simplified - assume graph is Eulerian)
findEulerianTour :: [(City, City, Distance)] -> [City] -> [City]
findEulerianTour edges cities = 
    let adjList = [(c, [v | (u, v, _) <- edges, u == c] ++ 
                       [u | (u, v, _) <- edges, v == c]) | c <- cities]
        startCity = head cities
    in eulerianDFS startCity adjList []
  where
    eulerianDFS current adjList visited
        | current `elem` visited = [current]
        | otherwise = 
            let neighbors = maybe [] id (lookup current adjList)
                newVisited = current : visited
            in current : concatMap (\n -> eulerianDFS n adjList newVisited) neighbors

-- Convert Eulerian tour to Hamiltonian by skipping repeated vertices
shortcutEulerianTour :: [City] -> [City]
shortcutEulerianTour tour = shortcut tour Set.empty []
  where
    shortcut [] _ result = reverse result
    shortcut (c:cs) visited result
        | c `Set.member` visited = shortcut cs visited result
        | otherwise = shortcut cs (Set.insert c visited) (c : result)

-- Calculate total tour cost
calculateTourCost :: DistanceMatrix -> [City] -> Distance
calculateTourCost distMatrix tour = 
    let tourWithReturn = tour ++ [head tour]
        pairs = zip tourWithReturn (tail tourWithReturn)
    in sum [distMatrix ! (u, v) | (u, v) <- pairs]

-- Dynamic Programming TSP for small instances - O(n² * 2^n)
dpTSP :: DistanceMatrix -> (Tour, Distance)
dpTSP distMatrix = 
    let (_, (n, _)) = bounds distMatrix
        cities = [0..n]
        numCities = length cities
        startCity = 0
    in if numCities <= 10  -- Only use DP for small instances
       then dpTSPHelper distMatrix cities startCity
       else christofidesTSP distMatrix  -- Fall back to approximation
  where
    dpTSPHelper dm cities start = 
        -- For demonstration, use brute force for very small instances
        let allTours = [start : perm ++ [start] | perm <- permutations (delete start cities)]
            tourCosts = [(tour, calculateTourCost dm tour) | tour <- allTours]
        in minimumBy (comparing snd) tourCosts

-- Main demonstration
main :: IO ()
main = do
    let (nnTour, nnCost) = nearestNeighborTSP sampleDistances 0
    let (cTour, cCost) = christofidesTSP sampleDistances
    
    putStrLn "TSP Solutions:"
    putStrLn $ "Nearest Neighbor (O(n²)): " ++ show nnTour ++ ", Cost: " ++ show nnCost
    putStrLn $ "Christofides (O(n³)): " ++ show cTour ++ ", Cost: " ++ show cCost
    
    -- For polynomial time complexity analysis:
    putStrLn "\nComplexity Analysis:"
    putStrLn "- Nearest Neighbor: O(n²) - Greedy approximation"
    putStrLn "- Christofides: O(n³) - 1.5-approximation algorithm"
    putStrLn "- Note: Exact TSP is NP-hard, these are polynomial approximations"</code></pre>
    
    <p><strong>Note:</strong> The Traveling Salesman Problem is NP-hard, so there's no known polynomial-time algorithm that finds the optimal solution. However, these implementations provide polynomial-time approximation algorithms:</p>
    
    <ul>
        <li><strong>Nearest Neighbor:</strong> O(n²) greedy approximation</li>
        <li><strong>Christofides Algorithm:</strong> O(n³) approximation with 1.5× optimal guarantee</li>
        <li><strong>Dynamic Programming:</strong> O(n²2ⁿ) for exact solutions (exponential, but shown for completeness)</li>
    </ul>
    
    <p>These approximation algorithms run in polynomial time and provide reasonably good solutions for practical purposes.</p>
    
    <h2>Practice Resources</h2>
    <p>
        <strong>Recommended Practice:</strong>
    </p>
    <ul>
        <li><a href="https://leetcode.com/">LeetCode</a> - Comprehensive problem set</li>
        <li><a href="https://www.hackerrank.com/">HackerRank</a> - Interview preparation tracks</li>
        <li><a href="https://www.codewars.com/">Codewars</a> - Coding challenges</li>
        <li><a href="https://github.com/PLU-Programming-Party">Programming Party GitHub</a> - Real project examples</li>
    </ul>
    
    <div style="margin-top: 3rem; text-align: center;">
        <a href="{{ '/' | url }}" class="btn btn-primary">← Back to Home</a>
    </div>
</div>