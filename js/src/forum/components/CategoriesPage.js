import IndexPage from 'flarum/components/IndexPage';
import listItems from 'flarum/helpers/listItems';
import humanTime from 'flarum/helpers/humanTime';

import sortTags from 'flarum/tags/utils/sortTags';
import tagLabel from 'flarum/tags/helpers/tagLabel';
import TagsPage from 'flarum/tags/components/TagsPage';

import Category from './Category';

export default class CategoriesPage extends TagsPage {
  init() {
    super.init();

    this.tags = sortTags(app.store.all('tags').filter(tag => !tag.parent()));

    app.history.push('categories', app.translator.trans('askvortsov-category.forum.header.back_to_categories_tooltip'));
  }

  view() {
    const pinned = this.tags.filter(tag => tag.position() !== null);
    const cloud = this.tags.filter(tag => tag.position() === null);


    return (
      <div className="CategoriesPage TagsPage">
        {IndexPage.prototype.hero()}
        <div className="container">
          <nav className="CategoriesPage-nav TagsPage-nav IndexPage-nav sideNav" config={IndexPage.prototype.affixSidebar}>
            <ul>{listItems(IndexPage.prototype.sidebarItems().toArray())}</ul>
          </nav>

          <div className="CategoriesPage-content sideNavOffset">
            <ol className="TagCategoryList">
              {pinned.map(tag => {
                return (Category.component({tag}));
              })}
            </ol>

            {cloud.length ? (
              <div className="TagCloud">
                {cloud.map(tag => [
                  tagLabel(tag, {link: true}),
                  ' ',
                ])}
              </div>
            ) : ''}
          </div>
        </div>
      </div>
    );
  }

  config(...args) {
    super.config(...args);

    if (m.route() != "/") {
      app.setTitle(app.translator.trans('askvortsov-categories.forum.meta.categories_title'));
    } else {
      app.setTitle('');
    }
    app.setTitleCount(0);
  }
}
