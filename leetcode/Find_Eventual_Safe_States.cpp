class Solution {
public:
    vector<int> eventualSafeNodes(vector<vector<int>>& graph) {
        int n = graph.size();
        vector<vector<int>> revAdj(n);
        vector<int> indegre(n, 0);
        for(int i=0; i<n; i++){
            for(auto it : graph[i]){
                revAdj[it].push_back(i);
                indegre[i]++;
            }
        }
        queue<int> qu;
        for(int i=0; i<n; i++){
            if(indegre[i] == 0) qu.push(i);
        }
        vector<int> safeNodes;
        while(!qu.empty()){
            int top = qu.front();
            qu.pop();
            safeNodes.push_back(top);
            for(auto it : revAdj[top]){
                indegre[it]--;
                if(indegre[it] == 0) qu.push(it);
            }
        }
        sort(safeNodes.begin(), safeNodes.end());
        return safeNodes;
    }
};