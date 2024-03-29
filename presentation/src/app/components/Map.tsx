import usePosts from 'app/hooks/usePosts';
import React, { useEffect } from 'react';
import { propsType } from './MapLandingPage';

// reference: https://velog.io/@acwell94/%EC%B9%B4%EC%B9%B4%EC%98%A4-%EC%A7%80%EB%8F%84-api%EB%A5%BC-%EC%9D%B4%EC%9A%A9%ED%95%B4%EC%84%9C-%ED%82%A4%EC%9B%8C%EB%93%9C-%EA%B2%80%EC%83%89-%ED%9B%84-%EB%A7%88%EC%BB%A4-%EC%9D%B4%EB%8F%99%ED%95%98%EA%B8%B0-%EA%B5%AC%ED%98%84

interface PlaceType {
	place_name: string;
	road_address_name: string;
	address_name: string;
	phone: string;
	place_url: string;
}

type Location = {
	placePosition: string;
	address_name: string;
	road_address_name: string;
};

type LocationData = {
	address_name: string;
	category_group_code: string;
	category_group_name: string;
	category_name: string;
	distance: string;
	id: string;
	phone: string;
	place_name: string;
	place_url: string;
	road_address_name: string;
	x: string;
	y: string;
};

const { kakao } = window as any;

export default function Map(props: propsType) {
	// 마커를 담는 배열
	let markers: any[] = [];
	const { posts } = usePosts();

	useEffect(() => {
		const mapContainer = document.getElementById('map');
		const mapOption = {
			center: new kakao.maps.LatLng(37.566826, 126.9786567), // current coordinate
			level: 3, // 지도의 확대 레벨
		};

		// map init
		const map = new kakao.maps.Map(mapContainer, mapOption);

		// location search init
		const ps = new kakao.maps.services.Places();

		// 검색 결과 목록이나 마커를 클릭했을 때 장소명을 표출할 인포윈도우를 생성합니다
		const infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });

		// 키워드로 장소를 검색합니다
		searchPlaces();

		// 키워드 검색을 요청하는 함수입니다
		function searchPlaces() {
			let keyword = props.searchKeyword;
			if (!keyword.replace(/^\s+|\s+$/g, '')) return false;

			// 장소검색 객체를 통해 키워드로 장소검색을 요청합니다
			ps.keywordSearch(keyword, placesSearchCB);
		}

		// identify pets location
		function isPetExists(currentLocation: string) {
			const targetLocations = posts?.map((aPost) => {
				return {
					roadLocation: aPost.postLocation.location,
					addressName: aPost.postLocation.detailedLocation,
				};
			});
			const targetRoadLocations = posts?.map(
				(aPost) => aPost.postLocation.roadLocation
			);
			const targetExtraLocations = posts?.map(
				(aPost) => aPost.postLocation.extraLocation
			);

			const matchedLocations = targetLocations.filter(
				(location) =>
					location.roadLocation.includes(currentLocation) ||
					currentLocation.includes(location.roadLocation)
			);
			const isRoadLocationMatch = targetRoadLocations.filter(
				(location) =>
					location.includes(currentLocation) ||
					currentLocation.includes(location)
			);

			return matchedLocations;
		}

		// 장소검색이 완료됐을 때 호출되는 콜백함수 입니다
		function placesSearchCB(data: any, status: any, pagination: any) {
			if (status === kakao.maps.services.Status.OK) {
				let petsLocations = isPetExists(props.searchKeyword);

				let locationData = [] as any[];
				for (let location of petsLocations) {
					let _location = location.roadLocation
						.replace(/\s/g, '')
						.split('('); // remove all whitespace and split `(` from string
					for (let searchLocation of data) {
						let _addressName = searchLocation.address_name.replace(
							/\s/g,
							''
						);
						let roadName = searchLocation.road_address_name.replace(
							/\s/g,
							''
						);
						if (
							(_location[0] === _addressName &&
								location.addressName ===
									searchLocation?.place_name) ||
							(_location[0] === roadName &&
								location.addressName ===
									searchLocation?.place_name)
						)
							locationData.push(searchLocation);
					}
				}

				// 정상적으로 검색이 완료됐으면
				// 검색 목록과 마커를 표출합니다
				// displayPlaces(data);
				displayPlaces(locationData);

				// paging number
				displayPagination(pagination);
			} else if (status === kakao.maps.services.Status.ZERO_RESULT) {
				alert('검색 결과가 존재하지 않습니다.');
				return;
			} else if (status === kakao.maps.services.Status.ERROR) {
				alert('검색 결과 중 오류가 발생했습니다.');
				return;
			}
		}

		// 검색 결과 목록과 마커를 표출하는 함수입니다
		function displayPlaces(places: string | any[]) {
			const listEl = document.getElementById('places-list');
			let resultEl = document.getElementById('search-result');
			let fragment = document.createDocumentFragment();
			let bounds = new kakao.maps.LatLngBounds();

			// 검색 결과 목록에 추가된 항목들을 제거합니다
			listEl && removeAllChildNods(listEl);

			// 지도에 표시되고 있는 마커를 제거합니다
			removeMarker();

			for (var i = 0; i < places.length; i++) {
				// 마커를 생성하고 지도에 표시합니다
				let placePosition = new kakao.maps.LatLng(
					places[i].y,
					places[i].x
				);
				let address_name = places[i].address_name;
				let road_address_name = places[i].road_address_name;

				let marker = addMarker(
					{ placePosition, address_name, road_address_name },
					i,
					undefined
				);
				let itemEl = getListItem(i, places[i]); // 검색 결과 항목 Element를 생성합니다

				// 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
				// LatLngBounds 객체에 좌표를 추가합니다
				bounds.extend(placePosition);

				// 마커와 검색결과 항목에 mouseover 했을때
				// 해당 장소에 인포윈도우에 장소명을 표시합니다
				// mouseout 했을 때는 인포윈도우를 닫습니다
				(function (marker, title) {
					// display marker's title when clicks on the address result (on address itself)
					kakao.maps.event.addListener(
						marker,
						'mouseover',
						function () {
							displayOverlayInfo(marker, title);
						}
					);
					kakao.maps.event.addListener(
						marker,
						'mouseout',
						function () {
							infowindow.close();
						}
					);
					// display marker's title when clicks on the address result (on navbar)
					itemEl.onmouseover = function () {
						// displayInfowindow(marker, title);
						displayOverlayInfo(marker, ''); // NOTE: test marker title
					};

					itemEl.onmouseout = function () {
						infowindow.close();
					};
				})(marker, places[i].place_name);

				fragment.appendChild(itemEl);
			}

			// 검색결과 항목들을 검색결과 목록 Element에 추가합니다
			listEl && listEl.appendChild(fragment);

			if (resultEl) {
				resultEl.scrollTop = 0;
			}

			// 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
			map.setBounds(bounds);
		}

		// 검색결과 항목을 Element로 반환하는 함수입니다
		function getListItem(index: number, places: PlaceType) {
			const el = document.createElement('li');
			let itemStr = `
				<div class="info">
					<span class="marker marker_${index + 1}"></span>
					<a href="${places.place_url}">
						<h5 class="info-item place-name">${places.place_name}</h5>
						${
							places.road_address_name
								? `<span class="info-item road-address-name">${places.road_address_name}</span>
								<span class="info-item address-name">${places.address_name}</span>`
								: `<span class="info-item address-name">${places.address_name}</span>`
						}
						<span class="info-item tel">${places.phone}</span>
					</a>
				</div>
			`;

			el.innerHTML = itemStr;
			el.className = 'item';

			return el;
		}

		// 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
		function addMarker(location: Location, idx: number, title: undefined) {
			// NOTE: marker reference: https://apis.map.kakao.com/web/sample/markerWithCustomOverlay/
			const imageSrcUrl =
				'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png';

			let imageSize = new kakao.maps.Size(36, 37);
			// let imageSize = new kakao.maps.Size(64, 69);

			let imgOptions = {
				spriteSize: new kakao.maps.Size(36, 691),
				spriteOrigin: new kakao.maps.Point(0, idx * 46 + 10),
				// offset: new kakao.maps.Point(27, 69),
				offset: new kakao.maps.Point(13, 37), // 마커 좌표에 일치시킬 이미지 내에서의 좌표
			};

			// custom overlay
			let content =
				'<div class="customoverlay">' +
				'  <a href="https://map.kakao.com/link/map/11394059" target="_blank">' +
				'    <span class="title">구의야구공원</span>' +
				'  </a>' +
				'</div>';

			let markerImage = new kakao.maps.MarkerImage(
				imageSrcUrl,
				imageSize,
				imgOptions
			);
			let marker = new kakao.maps.Marker({
				position: location.placePosition,
				image: markerImage,
			});

			marker.setMap(map); // 지도 위에 마커를 표출합니다
			markers.push(marker); // 배열에 생성된 마커를 추가합니다

			return marker;
		}

		// 지도 위에 표시되고 있는 마커를 모두 제거합니다
		function removeMarker() {
			for (var i = 0; i < markers.length; i++) {
				markers[i].setMap(null);
			}
			markers = [];
		}

		// 검색결과 목록 하단에 페이지번호를 표시는 함수입니다
		function displayPagination(pagination: {
			last: number;
			current: number;
			gotoPage: (arg0: number) => void;
		}) {
			const paginationEl = document.getElementById(
				'pagination'
			) as HTMLElement;
			let fragment = document.createDocumentFragment();
			let i;

			// 기존에 추가된 페이지번호를 삭제합니다
			while (paginationEl.hasChildNodes()) {
				paginationEl.lastChild &&
					paginationEl.removeChild(paginationEl.lastChild);
			}

			for (i = 1; i <= pagination.last; i++) {
				const el = document.createElement('a') as HTMLAnchorElement;
				el.href = '#';
				el.innerHTML = i.toString();

				if (i === pagination.current) {
					el.className = 'on';
				} else {
					el.onclick = (function (i) {
						return function () {
							pagination.gotoPage(i);
						};
					})(i);
				}
				fragment.appendChild(el);
			}
			paginationEl.appendChild(fragment);
		}

		// 검색결과 목록 또는 마커를 클릭했을 때 호출되는 함수입니다
		// 인포윈도우에 장소명을 표시합니다
		function displayOverlayInfo(marker: any, title: string) {
			const content =
				'<div style="padding:5px;z-index:1;" class="marker-title">' +
				`<h1 class="accommName">${title}</h1>` +
				`<p class="accommRegion">상태: false</p>` +
				'</div>';

			infowindow.setContent(content);
			infowindow.open(map, marker);
		}

		// 검색결과 목록의 자식 Element를 제거하는 함수입니다
		function removeAllChildNods(el: HTMLElement) {
			while (el.hasChildNodes()) {
				el.lastChild && el.removeChild(el.lastChild);
			}
		}
	}, [props.searchKeyword]);

	return (
		<div className="map-container">
			<div className="flex-grid flex-grid--wrap">
				<div id="map" className="map"></div>
				<div id="search-result" className="search-result">
					<p className="result-text">
						<span className="result-keyword">
							{props.searchKeyword}
						</span>
						검색 결과
					</p>
					<div className="scroll-wrapper">
						<ul id="places-list" className="places-list"></ul>
					</div>
					<div
						id="pagination"
						className="pagination flex-grid flex-grid--center"
					></div>
				</div>
			</div>
		</div>
	);
}
