let readCount = 0;
const loadAllData = async () => {
    try {
        const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/posts');
        if (!res.ok) throw new Error("Failed to fetch posts");
        const data = await res.json();

        const mainContainer = document.getElementById('mainContainer');
        data.posts.forEach(post => {
            const div = document.createElement('div');
            div.classList.add('bg-white', 'rounded-lg', 'shadow-md', 'p-6', 'hover:shadow-lg', 'transition-shadow', 'duration-300');

            div.innerHTML = `
                <div class="flex flex-col lg:flex-row items-center lg:items-start gap-6">
                    <img src="${post.image}" alt="Post Image" class="w-full lg:w-1/3 rounded-lg shadow-md">
                    <div class="flex-1 text-left">
                        <div class="flex gap-6 text-gray-500 mb-4 text-lg">
                            <span class="font-bold text-blue-500">#${post.category}</span>
                            <p>Author: <span class="text-gray-700">${post.author.name}</span></p>
                        </div>
                        <h1 class="text-3xl font-bold text-gray-700">${post.title}</h1>
                        <p class="py-4 text-gray-600">
                            ${post.description}
                        </p>
                    </div>
                </div>
                <hr class="my-4">
                <div class="flex justify-between items-center">
                    <div class="flex gap-3 text-lg font-medium text-gray-600">
                        <p><strong>Comments:</strong> ${post.comment_count}</p>
                        <p><strong>Views:</strong> ${post.view_count}</p>
                        <p><strong>Posted:</strong> ${post.posted_time} Min Ago</p>
                    </div>
                    <button onclick="handleClick('${post.title}')" id="btn"  class="btn btn-accent hover:bg-blue-600 transition">Add</button>
                </div>
            `;

            mainContainer.appendChild(div);
        });
    } catch (error) {
        console.error("Error loading posts:", error);
        const mainContainer = document.getElementById('mainContainer');
        mainContainer.innerHTML = `<p class="text-red-500 font-semibold">Failed to load posts. Please try again later.</p>`;
    }
}
const handleClick = (title) => {
    const postTitle = document.getElementById('titleList')
    const li = document.createElement('li')
    const readCountElement = document.getElementById('readCount');
    li.classList.add('border-b', 'pb-2', 'text-lg')
    li.textContent = title
    postTitle.appendChild(li)


    readCount += 1;
    readCountElement.textContent = `Marked as Read: ${readCount}`;


}

loadAllData();
