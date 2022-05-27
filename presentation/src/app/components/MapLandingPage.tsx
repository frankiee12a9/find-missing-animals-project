import React, { useState } from 'react';
import Map from './Map';

export interface propsType {
  searchKeyword: string;
}

export default function MapLandingPage() {
  const [Value, setValue] = useState('');
  const [Keyword, setKeyword] = useState('');
  const keywordChange = (e: {
    preventDefault: () => void;
    target: { value: string };
  }) => {
    e.preventDefault();
    setValue(e.target.value);
  };

  const submitKeyword = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setKeyword(Value);
  };

  const valueChecker = () => {
    if (Value === '') {
      alert('검색어를 입력해주세요.');
    }
  };

  return (
    <div className="landing-page">
      <div className="landing-page__inner">
        <div className="search-form-container">
          <form className="search-form" onSubmit={submitKeyword}>
            <label htmlFor="place" className="form__label">
              <input
                type="text"
                id="movie-title"
                className="form__input"
                name="place"
                onChange={keywordChange}
                placeholder="검색어를 입력해주세요. (ex: 노원구 광운로)"
                required
              />
              <div className="btn-box">
                <input
                  className="btn form__submit"
                  type="submit"
                  value="검색"
                  onClick={valueChecker}
                />
              </div>
            </label>
          </form>
        </div>
        {/* 제출한 검색어 넘기기 */}
        <Map searchKeyword={Keyword} />
      </div>
    </div>
  );
}
