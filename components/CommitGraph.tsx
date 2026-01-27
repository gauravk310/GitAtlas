'use client';

import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface Commit {
    sha: string;
    commit: {
        author: {
            name: string;
            date: string;
        };
        message: string;
    };
    author: {
        login: string;
        avatar_url: string;
    } | null;
    parents: Array<{ sha: string }>;
}

interface CommitGraphProps {
    commits: Commit[];
}

export default function CommitGraph({ commits }: CommitGraphProps) {
    const svgRef = useRef<SVGSVGElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!svgRef.current || !containerRef.current || commits.length === 0) return;

        // Clear previous graph
        d3.select(svgRef.current).selectAll('*').remove();

        const container = containerRef.current;
        const width = container.clientWidth;
        const height = Math.max(600, commits.length * 60);
        const margin = { top: 20, right: 20, bottom: 20, left: 20 };

        const svg = d3.select(svgRef.current)
            .attr('width', width)
            .attr('height', height);

        // Create a map of commits for quick lookup
        const commitMap = new Map(commits.map(c => [c.sha, c]));

        // Build graph structure
        interface GraphNode {
            id: string;
            commit: Commit;
            x: number;
            y: number;
            column: number;
        }

        interface GraphLink {
            source: GraphNode;
            target: GraphNode;
        }

        const nodes: GraphNode[] = [];
        const links: GraphLink[] = [];
        const columnMap = new Map<string, number>();
        let currentColumn = 0;

        // Assign columns to commits (simple linear layout)
        commits.forEach((commit, index) => {
            const column = columnMap.get(commit.sha) ?? currentColumn;
            columnMap.set(commit.sha, column);

            const node: GraphNode = {
                id: commit.sha,
                commit,
                x: margin.left + column * 80 + 40,
                y: margin.top + index * 60 + 30,
                column
            };

            nodes.push(node);

            // Create links to parents
            commit.parents.forEach(parent => {
                const parentCommit = commitMap.get(parent.sha);
                if (parentCommit) {
                    const parentNode = nodes.find(n => n.id === parent.sha);
                    if (parentNode) {
                        links.push({
                            source: node,
                            target: parentNode
                        });
                    }
                }
            });
        });

        // Draw links (commit connections)
        const linkGroup = svg.append('g').attr('class', 'links');

        linkGroup.selectAll('path')
            .data(links)
            .enter()
            .append('path')
            .attr('d', (d: GraphLink) => {
                const sourceX = d.source.x;
                const sourceY = d.source.y;
                const targetX = d.target.x;
                const targetY = d.target.y;

                // Create curved path
                const midY = (sourceY + targetY) / 2;
                return `M ${sourceX} ${sourceY} 
                        C ${sourceX} ${midY}, 
                          ${targetX} ${midY}, 
                          ${targetX} ${targetY}`;
            })
            .attr('fill', 'none')
            .attr('stroke', '#8b5cf6')
            .attr('stroke-width', 2)
            .attr('opacity', 0.6);

        // Draw nodes (commits)
        const nodeGroup = svg.append('g').attr('class', 'nodes');

        const nodeElements = nodeGroup.selectAll('g')
            .data(nodes)
            .enter()
            .append('g')
            .attr('transform', (d: GraphNode) => `translate(${d.x}, ${d.y})`);

        // Add circles for commits
        nodeElements.append('circle')
            .attr('r', 8)
            .attr('fill', '#8b5cf6')
            .attr('stroke', '#a78bfa')
            .attr('stroke-width', 2)
            .style('cursor', 'pointer')
            .on('mouseenter', function (event: MouseEvent, d: GraphNode) {
                const element = d3.select(this);
                element.transition()
                    .duration(200)
                    .attr('r', 12)
                    .attr('fill', '#a78bfa');

                // Show tooltip
                const tooltip = svg.append('g')
                    .attr('class', 'tooltip')
                    .attr('transform', `translate(${d.x + 20}, ${d.y - 20})`);

                const message = d.commit.commit.message.split('\n')[0];
                const author = d.commit.commit.author.name;
                const date = new Date(d.commit.commit.author.date).toLocaleDateString();

                const tooltipTextLines = [
                    message.length > 40 ? message.substring(0, 40) + '...' : message,
                    `${author} - ${date}`
                ];

                const padding = 10;
                const lineHeight = 20;

                const bg = tooltip.append('rect')
                    .attr('fill', '#1e1b4b')
                    .attr('stroke', '#8b5cf6')
                    .attr('stroke-width', 1)
                    .attr('rx', 5);

                const textGroup = tooltip.append('g');
                tooltipTextLines.forEach((line, i) => {
                    textGroup.append('text')
                        .attr('x', padding)
                        .attr('y', padding + (i + 1) * lineHeight - 5)
                        .attr('fill', '#fff')
                        .attr('font-size', '12px')
                        .text(line);
                });

                const bbox = (textGroup.node() as SVGGraphicsElement)?.getBBox();
                if (bbox) {
                    bg.attr('width', bbox.width + padding * 2)
                        .attr('height', bbox.height + padding * 2);
                }
            })
            .on('mouseleave', function (this: SVGCircleElement) {
                d3.select(this)
                    .transition()
                    .duration(200)
                    .attr('r', 8)
                    .attr('fill', '#8b5cf6');

                svg.selectAll('.tooltip').remove();
            });

        // Add commit SHA labels
        nodeElements.append('text')
            .attr('x', 15)
            .attr('y', 5)
            .attr('fill', '#9ca3af')
            .attr('font-size', '11px')
            .attr('font-family', 'monospace')
            .text((d: GraphNode) => d.commit.sha.substring(0, 7));

    }, [commits]);

    return (
        <div ref={containerRef} className="w-full overflow-x-auto overflow-y-auto max-h-[600px] custom-scrollbar">
            <svg ref={svgRef} className="w-full" />
        </div>
    );
}
