Hi, this is the Technical Test solved.

I used Next.js and Node.js on their most lts version. I followed up the guidelines required for the implementation of the project and I deployed on Vercel app. you can see on live the 
behavior of the test, I used Tailwind CSS for the styles of the project. You can also find a button for simulate changes on the data locally on the button of "Edit a Random Post". Then,
after a minute you can see the logs of the changes that have been ocurred on the posts.

Also let's discuss how is handled the data here!

Data Fetching
Initial Load: When the application starts, it fetches all users from the API. Once users are loaded, it automatically fetches posts for the first user to provide immediate data for viewing.
User Interaction: Users can manually fetch posts for different users by clicking the "Load Posts" button. This demonstrates a user-driven approach to data fetching.
On-Demand Data Loading: Reduces overhead by fetching user-specific data only when requested.

I provide the link for the page: https://technicaltest-one.vercel.app/.

