import request from "./request";

const ARTICLE = "article/"

export function getArticleByType(type) {
    return request.get(ARTICLE + type);
}

export function getArticleById(id) {
    return request.get(ARTICLE + id);
}

export function addArticle(article ){
    return request.post(ARTICLE, article);
}

export function updateArticle(article){
    return request.put(ARTICLE + article.id, article);
}

export function deleteArticle(id){
    return request.delete(ARTICLE + id);
}