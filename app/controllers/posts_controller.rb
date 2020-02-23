class PostsController < ApplicationController

    before_action :authorize_admin, only: [:new, :create, :edit, :destroy, :update]

    def index
        @posts = Post.all.order("created_at DESC")
    end

    def new
        @post = Post.new
    end
    
    def create
        @post = Post.new(post_params)

        if @post.save
            redirect_to @post
        else
            render 'new'
        end
    end

    def edit
    @post = Post.find(params[:id])
    end

    def destroy
    @post = Post.find(params[:id])
    @post.destroy

    redirect_to posts_path
    end

    def update
    @post = Post.find(params[:id])

        if @post.update(post_params)
            redirect_to @post
        else
            render 'edit'
        end
    end

    def show
        @post = Post.find(params[:id])
    end
    private

    def post_params
        params.require(:post).permit(:title, :caption, :image)
    end
end
