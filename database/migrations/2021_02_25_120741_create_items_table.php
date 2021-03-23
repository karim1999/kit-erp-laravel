<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateItemsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('items', function (Blueprint $table) {
            $table->id();

            $table->string('name')->nullable();
            $table->mediumText('description')->nullable();
            $table->integer('quantity')->default(1);

            $table->decimal('in_rate', 15, 2)->default(0);
            $table->decimal('out_rate', 15, 2)->default(0);
            $table->decimal('margin', 15, 2)->default(0);
            $table->enum('margin_type', ["%", "actual"])->default('%');
            $table->decimal('discount', 15, 2)->default(0);
            $table->enum('discount_type', ["%", "actual"])->default('%');

            $table->decimal('amount', 15, 2)->default(0);
            $table->decimal('actual', 15, 2)->default(0);
            $table->decimal('period', 15, 2)->default(0);
            $table->string('period_unit')->nullable();

            $table->string('unit')->nullable();

            $table->boolean('is_header')->default(false);
            $table->boolean('is_text')->default(true);
            $table->string('product_id')->nullable();


            $table->unsignedBigInteger('quote_id')->nullable();
            $table->foreign('quote_id')->references('id')->on('quotes')->onDelete('cascade');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('items');
    }
}
