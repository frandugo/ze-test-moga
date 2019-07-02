(function(){

	async function getFamous(){
		const url = 'https://api.jsonbin.io/b/5d1a25acf467d60d75aba228/2';
		const famous = await fetch(url, {
			headers: {
				'Content-Type': 'application/json',
				'secret-key': '$2a$10$71UGnz6X5nvdfBKfDIWRVecFpZzS91T5UZeFTEyGM6enzBqGQmlvy'
			}
		})
		.then((resp) => resp.json())
		.catch(error => console.error(error))
		return famous;
	}

	function famousItems(id, name, img, category, description, like, dislike){
		const likeIcon = `<span class="famous__item-status famous__item-status-like" style="${ like > dislike ? 'display: block;' : 'display: none;' }">
												<i title="like" aria-hidden="true" data-icon="&#xe904"></i>
											</span>`;
		const dislikeIcon =	`<span class="famous__item-status famous__item-status-dislike" style="${ like > dislike ? 'display: none;' : 'display: block;' }">
													<i title="dislike" aria-hidden="true" data-icon="&#xe903"></i>
												</span>`;								
		const famousItem = `<div class="famous__item">
				<img src="./assets/${ img }" alt="${ name }" />
				<div class="famous__item-content">
					<div class="famous__item-info">
						<h3>
							${ likeIcon }
							${ dislikeIcon }
							${ name }
						</h3>
						<span class="famous__item-date"><strong>1 month ago</strong> in ${ category }</span>
						<p>${ description }</p>
						<div class="famous__item-votes">

							<div class="famous__item-vote-again js-vote-again">
								<p>Thank you for voting!</p>
								<a href="#" class="famous__item-vote-button famous__item-vote js-button-vote-again">Vote again</a>
							</div>

							<div class="famous__item-will-vote js-will-vote">
								<label for="like-${ id }" data-like="">
									<input type="radio" name="${ name }" id="like-${ id }" checked="checked" />
									<span class="famous__item-like">
										<i title="like" aria-hidden="true" data-icon="&#xe904"></i>
									</span>
								</label>
								
								<label for="dislike-${ id }" data-dislike="">
									<input type="radio" name="${ name }" id="dislike-${ id }" />
									<span class="famous__item-dislike">
										<i title="dislike" aria-hidden="true" data-icon="&#xe903"></i>
									</span>	
								</label>
								<a href="#" class="famous__item-vote-button famous__item-vote js-vote">Vote now</a>
							</div>

						</div>
					</div>

					<div class="famous__item-score">
						<div class="score__item score__item-like" data-like="${ like }">
							<span class="score__like-info">
								<i title="like" aria-hidden="true" data-icon="&#xe904"></i>
								<span class="percentage">${ like }</span><span>%</span>
							</span>
						</div>
						<div class="score__item score__item-dislike" data-dislike="${ dislike }">
							<span class="score__like-info">
								<i title="dislike" aria-hidden="true" data-icon="&#xe903"></i>
								<span class="percentage">${ dislike }</span><span>%</span>
							</span>	
						</div>
					</div>
				</div>	
			</div>`;
		return famousItem;
	}

	async function AddItems(){
		const famousContent = document.querySelector(".famous-content");
		const famous = await getFamous();
		localStorage.setItem('famous', JSON.stringify(famous));
		const famousStorage = JSON.parse(localStorage.getItem('famous'));
		const allFamous = famousStorage.famous.map((item,index) => {
			return famousItems(item.id, item.name, item.photo, item.category, item.description, item.like, item.dislike);
		}).join('');
		
		famousContent.innerHTML = allFamous;
		voteButton();
		voteAgain();
	};
	AddItems();

	function voteAgain(){
		const voteAgainButton = document.querySelectorAll(".js-button-vote-again");
		voteAgainButton.forEach( el => {
			el.addEventListener('click', e => {
				e.preventDefault();
				const voteAgain = e.target.parentNode;
				const willVote = e.target.parentNode.previousSibling.parentElement.lastElementChild;
				willVote.style.display = "block";
				voteAgain.style.display = "none";
			});	
		});	
	}

	function voteButton(){
		const voteButton = document.querySelectorAll(".js-vote");

		voteButton.forEach( el => {

				el.addEventListener('click', e => {
					e.preventDefault();

					const dislike = e.target.previousElementSibling.firstElementChild;
					const dislikeParent = e.target.previousElementSibling;
					const like = dislikeParent.previousElementSibling.firstElementChild;
					const voteAgainBox = e.target.previousSibling.parentNode.previousElementSibling;
					const willVoteBox = e.target.previousSibling.parentNode;
					const scoreBox = e.target.previousSibling.parentNode.parentNode.parentNode.previousSibling.parentElement.lastElementChild;
					const scoreLike = scoreBox.firstElementChild;
					var scoreLikeCurrent = scoreLike.dataset.like;
					var scoreLikeCurrentText = scoreBox.firstElementChild.lastElementChild.lastElementChild.previousSibling;
					const scoreDislike = scoreBox.lastElementChild;
					var scoreDislikeCurrent = scoreDislike.dataset.dislike;
					var scoreDislikeCurrentText = scoreBox.lastElementChild.lastElementChild.lastElementChild.previousSibling;
					const likeIcon = voteAgainBox.parentElement.parentElement.firstElementChild.firstElementChild;
					const dislikeIcon = voteAgainBox.parentElement.parentElement.firstElementChild.lastElementChild;
					
					voteAgainBox.style.display = "block";
					willVoteBox.style.display = "none";

					if(like.checked == true){
						scoreLike.dataset.like = parseInt(scoreLikeCurrent) + 1;
						scoreLike.style.width = parseInt(scoreLikeCurrent) * 100 / (parseInt(scoreLikeCurrent) + parseInt(scoreDislikeCurrent)) + '%';
						scoreDislike.style.width = parseInt(scoreDislikeCurrent) * 100 / (parseInt(scoreLikeCurrent) + parseInt(scoreDislikeCurrent)) + '%';
						scoreLikeCurrentText.innerHTML = Math.round( parseInt(scoreLikeCurrent) * 100 / (parseInt(scoreLikeCurrent) + parseInt(scoreDislikeCurrent)) );
						scoreDislikeCurrentText.innerHTML = 100 - scoreLikeCurrentText.innerHTML;

					}else{
						if(dislike.checked == true){
							scoreDislike.dataset.dislike = parseInt(scoreDislikeCurrent) + 1;
							scoreDislike.style.width = parseInt(scoreDislikeCurrent) * 100 / (parseInt(scoreDislikeCurrent) + parseInt(scoreLikeCurrent)) + '%';
							scoreLike.style.width = parseInt(scoreLikeCurrent) * 100 / (parseInt(scoreDislikeCurrent) + parseInt(scoreLikeCurrent)) + '%';
							scoreDislikeCurrentText.innerHTML = Math.round( parseInt(scoreDislikeCurrent) * 100 / (parseInt(scoreDislikeCurrent) + parseInt(scoreLikeCurrent)) );
							scoreLikeCurrentText.innerHTML = 100 - scoreDislikeCurrentText.innerHTML;
						}
					}

					if(scoreLikeCurrentText.innerHTML > scoreDislikeCurrentText.innerHTML){
						likeIcon.style.display = 'block';
						dislikeIcon.style.display = 'none';
					}else{
						likeIcon.style.display = 'none';
						dislikeIcon.style.display = 'block';
					}
				
				});
			
		});
	}

})();


